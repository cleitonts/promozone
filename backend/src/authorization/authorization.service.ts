import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Tenant } from './entities/tenant.entity';
import { PolicyService } from './services/policy.service';
import { PolicyContext } from './services/policy-evaluator.service';

export interface EffectivePermission {
  resource: string;
  action: string;
  name: string;
}

export interface AuthorizationContext {
  userId: string;
  tenantId?: string;
  resource?: string;
  resourceId?: string;
  user?: any;
  request?: any;
}

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private policyService: PolicyService,
  ) {}

  async getUserEffectivePermissions(
    userId: string,
    tenantId?: string,
  ): Promise<EffectivePermission[]> {
    const permissions = new Map<string, EffectivePermission>();

    const globalUserRoles = await this.userRoleRepository
      .createQueryBuilder('ur')
      .leftJoinAndSelect('ur.role', 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rp')
      .leftJoinAndSelect('rp.permission', 'permission')
      .where('ur.user = :userId', { userId })
      .andWhere('ur.tenant IS NULL')
      .andWhere('role.isGlobal = true')
      .getMany();

    for (const userRole of globalUserRoles) {
      if (userRole.role?.rolePermissions) {
        for (const rolePermission of userRole.role.rolePermissions) {
          const permission = rolePermission.permission;
          if (permission) {
            const key = `${permission.resource}:${permission.action}`;
            permissions.set(key, {
              resource: permission.resource,
              action: permission.action,
              name: permission.name,
            });
          }
        }
      }
    }

    if (tenantId) {
      const tenantUserRoles = await this.userRoleRepository
        .createQueryBuilder('ur')
        .leftJoinAndSelect('ur.role', 'role')
        .leftJoinAndSelect('role.rolePermissions', 'rp')
        .leftJoinAndSelect('rp.permission', 'permission')
        .where('ur.user = :userId', { userId })
        .andWhere('ur.tenant = :tenantId', { tenantId })
        .getMany();

      for (const userRole of tenantUserRoles) {
        if (userRole.role?.rolePermissions) {
          for (const rolePermission of userRole.role.rolePermissions) {
            const permission = rolePermission.permission;
            if (permission) {
              const key = `${permission.resource}:${permission.action}`;
              permissions.set(key, {
                resource: permission.resource,
                action: permission.action,
                name: permission.name,
              });
            }
          }
        }
      }
    }

    return Array.from(permissions.values());
  }

  async can(
    context: AuthorizationContext,
    resource: string,
    action: string,
  ): Promise<boolean> {
    const user = context.user || await this.userRepository.findOne({ where: { id: context.userId } });
    if (user?.isSuperuser) {
      return true;
    }

    const permissions = await this.getUserEffectivePermissions(
      context.userId,
      context.tenantId,
    );

    const hasRolePermission = permissions.some(
      (permission) =>
        permission.resource === resource && permission.action === action,
    );

    try {
      const policyContext: PolicyContext = {
        user,
        resource: context.resource,
        tenant: { id: context.tenantId },
        request: context.request,
      };

      const policyResult = await this.policyService.evaluatePolicies(
        resource,
        action,
        policyContext,
        context.tenantId,
      );

      if (policyResult.matchedPolicies.length > 0) {
        return policyResult.allowed;
      }

      return hasRolePermission;
    } catch (error) {
      console.error('Error evaluating policies:', error);
      return hasRolePermission;
    }
  }

  async canAny(
    context: AuthorizationContext,
    checks: Array<{ resource: string; action: string }>,
  ): Promise<boolean> {
    const permissions = await this.getUserEffectivePermissions(
      context.userId,
      context.tenantId,
    );

    return checks.some((check) =>
      permissions.some(
        (permission) =>
          permission.resource === check.resource &&
          permission.action === check.action,
      ),
    );
  }

  async canAll(
    context: AuthorizationContext,
    checks: Array<{ resource: string; action: string }>,
  ): Promise<boolean> {
    const permissions = await this.getUserEffectivePermissions(
      context.userId,
      context.tenantId,
    );

    return checks.every((check) =>
      permissions.some(
        (permission) =>
          permission.resource === check.resource &&
          permission.action === check.action,
      ),
    );
  }

  async assignRoleToUser(
    userId: string,
    roleId: string,
    tenantId?: string,
  ): Promise<UserRole> {
    const existingUserRole = await this.userRoleRepository.findOne({
      where: {
        user: { id: userId },
        role: { id: roleId },
        tenant: tenantId ? { id: tenantId } : undefined,
      },
    });

    if (existingUserRole) {
      return existingUserRole;
    }

    const userRole = this.userRoleRepository.create({
      user: { id: userId },
      role: { id: roleId },
      tenant: tenantId ? { id: tenantId } : undefined,
    });

    return this.userRoleRepository.save(userRole);
  }

  async isOwnerOfTenant(userId: string, tenantId: string): Promise<boolean> {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId },
      relations: ['owner'],
    });

    return tenant?.owner?.id === userId;
  }

  async isSuperuser(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.isSuperuser || false;
  }

  async canCreateTenantOwner(userId: string, tenantId?: string): Promise<boolean> {
    if (await this.isSuperuser(userId)) {
      return true;
    }

    if (tenantId) {
      return await this.isOwnerOfTenant(userId, tenantId);
    }

    return false;
  }

  async canAddUserToTenant(userId: string, tenantId: string): Promise<boolean> {
    if (await this.isSuperuser(userId)) {
      return true;
    }

    return await this.isOwnerOfTenant(userId, tenantId);
  }

  async createTenant(data: {
    name: string;
    description?: string;
    slug: string;
    domain?: string;
    ownerId: string;
    settings?: any;
  }): Promise<Tenant> {
    const tenant = this.tenantRepository.create({
      name: data.name,
      description: data.description,
      slug: data.slug,
      domain: data.domain,
      owner: { id: data.ownerId },
      settings: data.settings,
    });

    const savedTenant = await this.tenantRepository.save(tenant);

    const ownerRole = await this.roleRepository.findOne({
      where: { name: 'Owner', isGlobal: true },
    });

    if (ownerRole) {
      await this.assignRoleToUser(data.ownerId, ownerRole.id, savedTenant.id);
    }

    return savedTenant;
  }

  async updateTenant(id: string, data: {
    name?: string;
    description?: string;
    domain?: string;
    settings?: any;
  }): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    Object.assign(tenant, data);
    return this.tenantRepository.save(tenant);
  }

  async deleteTenant(id: string): Promise<void> {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    await this.userRoleRepository.delete({ tenant: { id } });
    await this.tenantRepository.remove(tenant);
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async getUserTenants(userId: string): Promise<Tenant[]> {
    if (await this.isSuperuser(userId)) {
      return this.tenantRepository.find({
        relations: ['owner'],
        where: { isActive: true },
      });
    }

    const userRoles = await this.userRoleRepository
      .createQueryBuilder('ur')
      .leftJoinAndSelect('ur.tenant', 'tenant')
      .leftJoinAndSelect('tenant.owner', 'owner')
      .where('ur.user = :userId', { userId })
      .andWhere('ur.tenant IS NOT NULL')
      .andWhere('tenant.isActive = true')
      .getMany();

    const tenants = userRoles
      .map(ur => ur.tenant)
      .filter((tenant, index, self) => 
        tenant && self.findIndex(t => t?.id === tenant.id) === index
      ) as Tenant[];

    return tenants;
  }

  async canPerformAction(
    userId: string,
    resource: string,
    action: string,
    tenantId?: string,
    resourceId?: string
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user?.isSuperuser) {
      return true;
    }

    const context: AuthorizationContext = {
      userId,
      tenantId,
      resource,
      resourceId,
    };

    const hasPermission = await this.can(context, resource, action);
    if (!hasPermission) {
      return false;
    }

    const policyContext: PolicyContext = {
      user: { id: userId },
      resource: { id: resourceId },
      tenant: tenantId ? { id: tenantId } : undefined,
    };

    const policyResult = await this.policyService.evaluatePolicies(
      resource,
      action,
      policyContext,
      tenantId
    );

    return policyResult.allowed;
  }

  async removeRoleFromUser(
    userId: string,
    roleId: string,
    tenantId?: string,
  ): Promise<void> {
    await this.userRoleRepository.delete({
      user: { id: userId },
      role: { id: roleId },
      tenant: tenantId ? { id: tenantId } : undefined,
    });
  }

  async getUserRoles(
    userId: string,
    tenantId?: string,
  ): Promise<Role[]> {
    const query = this.userRoleRepository
      .createQueryBuilder('ur')
      .leftJoinAndSelect('ur.role', 'role')
      .where('ur.user = :userId', { userId });

    if (tenantId) {
      query.andWhere('ur.tenant = :tenantId', { tenantId });
    } else {
      query.andWhere('ur.tenant IS NULL');
    }

    const userRoles = await query.getMany();
    return userRoles.map((ur) => ur.role).filter(Boolean);
  }

  async getRoles(tenantId?: string): Promise<Role[]> {
    const whereCondition: any = {};

    if (tenantId) {
      whereCondition.tenant = { id: tenantId };
    } else {
      whereCondition.isGlobal = true;
    }

    return this.roleRepository.find({
      where: whereCondition,
      relations: ['permissions'],
    });
  }

  async getRoleById(id: string, tenantId?: string): Promise<Role | null> {
    const whereCondition: any = { id };

    if (tenantId) {
      whereCondition.tenant = { id: tenantId };
    } else {
      whereCondition.isGlobal = true;
    }

    return this.roleRepository.findOne({
      where: whereCondition,
      relations: ['permissions'],
    });
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create(roleData);
    return this.roleRepository.save(role);
  }

  async updateRole(id: string, roleData: Partial<Role>, tenantId?: string): Promise<Role> {
    const role = await this.getRoleById(id, tenantId);
    if (!role) {
      throw new Error('Role not found');
    }

    Object.assign(role, roleData);
    return this.roleRepository.save(role);
  }

  async deleteRole(id: string, tenantId?: string): Promise<void> {
    const role = await this.getRoleById(id, tenantId);
    if (!role) {
      throw new Error('Role not found');
    }

    await this.roleRepository.remove(role);
  }

  async getPermissions(tenantId?: string): Promise<Permission[]> {
    const whereCondition: any = {};

    if (tenantId) {
      whereCondition.tenant = { id: tenantId };
    } else {
      whereCondition.isGlobal = true;
    }

    return this.permissionRepository.find({
      where: whereCondition,
    });
  }

  async getPermissionById(id: string, tenantId?: string): Promise<Permission | null> {
    const whereCondition: any = { id };

    if (tenantId) {
      whereCondition.tenant = { id: tenantId };
    } else {
      whereCondition.isGlobal = true;
    }

    return this.permissionRepository.findOne({
      where: whereCondition,
    });
  }

  async createPermission(permissionData: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionRepository.create(permissionData);
    return this.permissionRepository.save(permission);
  }

  async updatePermission(id: string, permissionData: Partial<Permission>, tenantId?: string): Promise<Permission> {
    const permission = await this.getPermissionById(id, tenantId);
    if (!permission) {
      throw new Error('Permission not found');
    }

    Object.assign(permission, permissionData);
    return this.permissionRepository.save(permission);
  }

  async deletePermission(id: string, tenantId?: string): Promise<void> {
    const permission = await this.getPermissionById(id, tenantId);
    if (!permission) {
      throw new Error('Permission not found');
    }

    await this.permissionRepository.remove(permission);
  }

  async assignPermissionToRole(roleId: string, permissionId: string): Promise<void> {
    const existingAssignment = await this.rolePermissionRepository.findOne({
      where: {
        role: { id: roleId },
        permission: { id: permissionId },
      },
    });

    if (existingAssignment) {
      return;
    }

    const rolePermission = this.rolePermissionRepository.create({
      role: { id: roleId },
      permission: { id: permissionId },
    });

    await this.rolePermissionRepository.save(rolePermission);
  }

  async removePermissionFromRole(roleId: string, permissionId: string): Promise<void> {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: {
        role: { id: roleId },
        permission: { id: permissionId },
      },
    });

    if (rolePermission) {
      await this.rolePermissionRepository.remove(rolePermission);
    }
  }
}