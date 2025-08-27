import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';
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
    private policyService: PolicyService,
  ) {}

  /**
   * Obtém todas as permissões efetivas de um usuário
   * Combina permissões globais e específicas do tenant
   */
  async getUserEffectivePermissions(
    userId: string,
    tenantId?: string,
  ): Promise<EffectivePermission[]> {
    const permissions = new Map<string, EffectivePermission>();

    // 1. Buscar roles globais do usuário
    const globalUserRoles = await this.userRoleRepository
      .createQueryBuilder('ur')
      .leftJoinAndSelect('ur.role', 'role')
      .leftJoinAndSelect('role.rolePermissions', 'rp')
      .leftJoinAndSelect('rp.permission', 'permission')
      .where('ur.user = :userId', { userId })
      .andWhere('ur.tenant IS NULL')
      .andWhere('role.isGlobal = true')
      .getMany();

    // Adicionar permissões globais
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

    // 2. Se tenantId fornecido, buscar roles específicas do tenant
    if (tenantId) {
      const tenantUserRoles = await this.userRoleRepository
        .createQueryBuilder('ur')
        .leftJoinAndSelect('ur.role', 'role')
        .leftJoinAndSelect('role.rolePermissions', 'rp')
        .leftJoinAndSelect('rp.permission', 'permission')
        .where('ur.user = :userId', { userId })
        .andWhere('ur.tenant = :tenantId', { tenantId })
        .getMany();

      // Adicionar permissões específicas do tenant
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

  /**
   * Verifica se o usuário tem uma permissão específica
   * Combina verificação de permissões baseadas em roles com políticas
   */
  async can(
    context: AuthorizationContext,
    resource: string,
    action: string,
  ): Promise<boolean> {
    // 1. Verificar permissões baseadas em roles
    const permissions = await this.getUserEffectivePermissions(
      context.userId,
      context.tenantId,
    );

    const hasRolePermission = permissions.some(
      (permission) =>
        permission.resource === resource && permission.action === action,
    );

    // 2. Verificar políticas
    try {
      const user = context.user || await this.userRepository.findOne({ where: { id: context.userId } });
      
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

      // Se há políticas aplicáveis, usar o resultado das políticas
      if (policyResult.matchedPolicies.length > 0) {
        return policyResult.allowed;
      }

      // Se não há políticas aplicáveis, usar permissões baseadas em roles
      return hasRolePermission;
    } catch (error) {
      console.error('Erro ao avaliar políticas:', error);
      // Em caso de erro, usar apenas permissões baseadas em roles
      return hasRolePermission;
    }
  }

  /**
   * Verifica múltiplas permissões de uma vez
   */
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

  /**
   * Verifica se o usuário tem todas as permissões especificadas
   */
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

  /**
   * Atribui uma role a um usuário
   */
  async assignRoleToUser(
    userId: string,
    roleId: string,
    tenantId?: string,
  ): Promise<UserRole> {
    // Verificar se a atribuição já existe
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

    // Criar nova atribuição
    const userRole = this.userRoleRepository.create({
      user: { id: userId },
      role: { id: roleId },
      tenant: tenantId ? { id: tenantId } : undefined,
    });

    return this.userRoleRepository.save(userRole);
  }

  /**
   * Remove uma role de um usuário
   */
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

  /**
   * Obtém todas as roles de um usuário
   */
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

  // Role CRUD operations
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

  // Permission CRUD operations
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

  // Role-Permission assignment operations
  async assignPermissionToRole(roleId: string, permissionId: string): Promise<void> {
    const existingAssignment = await this.rolePermissionRepository.findOne({
      where: {
        role: { id: roleId },
        permission: { id: permissionId },
      },
    });

    if (existingAssignment) {
      return; // Already assigned
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