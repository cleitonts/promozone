import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { Policy } from '../entities/policy.entity';

@Injectable()
export class AuthorizationSeedService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  async seedAll(): Promise<void> {
    console.log('🌱 Initializing authorization seeds...');
    
    await this.seedGlobalPermissions();
    await this.seedGlobalRoles();
    await this.seedBasicPolicies();
    
    console.log('✅ Authorization seeds completed!');
  }


  private async seedGlobalPermissions(): Promise<void> {
    console.log('📋 Creating system permissions...');

    const systemPermissions = [
      { resource: 'users', action: 'read', name: 'users.read', description: 'Visualizar usuários' },
      { resource: 'users', action: 'write', name: 'users.write', description: 'Criar e editar usuários' },
      { resource: 'users', action: 'create', name: 'users.create', description: 'Criar novos usuários' },
      { resource: 'users', action: 'delete', name: 'users.delete', description: 'Excluir usuários' },
      { resource: 'users', action: 'manage', name: 'users.manage', description: 'Gerenciar usuários completamente' },

      { resource: 'roles', action: 'read', name: 'roles.read', description: 'Visualizar roles' },
      { resource: 'roles', action: 'write', name: 'roles.write', description: 'Criar e editar roles' },
      { resource: 'roles', action: 'delete', name: 'roles.delete', description: 'Excluir roles' },
      { resource: 'roles', action: 'assign', name: 'roles.assign', description: 'Atribuir roles a usuários' },

      { resource: 'permissions', action: 'read', name: 'permissions.read', description: 'Visualizar permissões' },
      { resource: 'permissions', action: 'write', name: 'permissions.write', description: 'Criar e editar permissões' },
      { resource: 'permissions', action: 'delete', name: 'permissions.delete', description: 'Excluir permissões' },

      { resource: 'policies', action: 'read', name: 'policies.read', description: 'Visualizar políticas' },
      { resource: 'policies', action: 'write', name: 'policies.write', description: 'Criar e editar políticas' },
      { resource: 'policies', action: 'delete', name: 'policies.delete', description: 'Excluir políticas' },

      { resource: 'tenant', action: 'read', name: 'tenant.read', description: 'Visualizar informações do tenant' },
      { resource: 'tenant', action: 'write', name: 'tenant.write', description: 'Editar configurações do tenant' },
      { resource: 'tenant', action: 'manage', name: 'tenant.manage', description: 'Gerenciar tenant completamente' },

      { resource: 'products', action: 'read', name: 'products.read', description: 'Visualizar produtos' },
      { resource: 'products', action: 'write', name: 'products.write', description: 'Criar e editar produtos' },
      { resource: 'products', action: 'delete', name: 'products.delete', description: 'Excluir produtos' },
      { resource: 'products', action: 'publish', name: 'products.publish', description: 'Publicar produtos' },

      { resource: 'categories', action: 'read', name: 'categories.read', description: 'Visualizar categorias' },
      { resource: 'categories', action: 'write', name: 'categories.write', description: 'Criar e editar categorias' },
      { resource: 'categories', action: 'delete', name: 'categories.delete', description: 'Excluir categorias' },

      { resource: 'brands', action: 'read', name: 'brands.read', description: 'Visualizar marcas' },
      { resource: 'brands', action: 'write', name: 'brands.write', description: 'Criar e editar marcas' },
      { resource: 'brands', action: 'delete', name: 'brands.delete', description: 'Excluir marcas' },

      { resource: 'reports', action: 'read', name: 'reports.read', description: 'Visualizar relatórios' },
      { resource: 'reports', action: 'export', name: 'reports.export', description: 'Exportar relatórios' },

      { resource: 'settings', action: 'read', name: 'settings.read', description: 'Visualizar configurações' },
      { resource: 'settings', action: 'write', name: 'settings.write', description: 'Editar configurações' },
    ];

    for (const permissionData of systemPermissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: {
          resource: permissionData.resource,
          action: permissionData.action,
        },
      });

      if (!existingPermission) {
        const permission = this.permissionRepository.create({
          ...permissionData,
        });
        await this.permissionRepository.save(permission);
        console.log(`  ✓ Global permission created: ${permissionData.name}`);
      }
    }
  }

  private async seedGlobalRoles(): Promise<void> {
    console.log('👑 Creating global roles...');

    const systemRoles = [
      {
        name: 'Super Admin',
        description: 'Global access to the system, including tenant management',
        permissions: ['*'],
      },
      {
        name: 'Owner',
        description: 'Tenant owner with full access to tenant features',
        permissions: [
          'users.manage', 'roles.read', 'roles.write', 'roles.assign',
          'permissions.read', 'policies.read', 'policies.write',
          'tenant.manage', 'products.read', 'products.write', 'products.delete', 'products.publish',
          'categories.read', 'categories.write', 'categories.delete',
          'brands.read', 'brands.write', 'brands.delete',
          'reports.read', 'reports.export', 'settings.read', 'settings.write'
        ],
      },
      {
        name: 'Admin',
        description: 'Tenant admin with access to most features',
        permissions: [
          'users.read', 'users.write', 'roles.read', 'roles.assign',
          'permissions.read', 'policies.read',
          'tenant.read', 'products.read', 'products.write', 'products.publish',
          'categories.read', 'categories.write',
          'brands.read', 'brands.write',
          'reports.read', 'settings.read'
        ],
      },
      {
        name: 'Manager',
        description: 'Tenant manager with access to product management features',
        permissions: [
          'users.read', 'products.read', 'products.write', 'products.publish',
          'categories.read', 'categories.write',
          'brands.read', 'brands.write',
          'reports.read'
        ],
      },
      {
        name: 'Editor',
        description: 'Tenant editor with access to content creation and editing',
        permissions: [
          'products.read', 'products.write',
          'categories.read', 'brands.read'
        ],
      },
      {
        name: 'Viewer',
        description: 'Tenant viewer with read-only access',
        permissions: [
          'products.read', 'categories.read', 'brands.read', 'reports.read'
        ],
      },
    ];

    for (const roleData of systemRoles) {
      const existingRole = await this.roleRepository.findOne({
        where: {
          name: roleData.name,
          isGlobal: true,
        },
      });

      if (!existingRole) {
        const role = this.roleRepository.create({
          name: roleData.name,
          description: roleData.description,
          isGlobal: true,
        });
        const savedRole = await this.roleRepository.save(role);
        console.log(`  ✓ Global role created: ${roleData.name}`);

        await this.assignPermissionsToRole(savedRole.id, roleData.permissions);
      }
    }
  }

  private async assignPermissionsToRole(
    roleId: string,
    permissionNames: string[],
  ): Promise<void> {
    for (const permissionName of permissionNames) {
      if (permissionName === '*') {
        const allPermissions = await this.permissionRepository.find();
        
        for (const permission of allPermissions) {
          const existingRolePermission = await this.rolePermissionRepository.findOne({
            where: { 
              role: { id: roleId },
              permission: { id: permission.id }
            },
          });

          if (!existingRolePermission) {
            const rolePermission = this.rolePermissionRepository.create({
              role: { id: roleId },
              permission: { id: permission.id },
            });
            await this.rolePermissionRepository.save(rolePermission);
          }
        }
      } else {
        const permission = await this.permissionRepository.findOne({
          where: { 
            resource: permissionName.split('.')[0],
            action: permissionName.split('.')[1]
          },
        });

        if (permission) {
          const existingRolePermission = await this.rolePermissionRepository.findOne({
            where: { 
              role: { id: roleId },
              permission: { id: permission.id }
            },
          });

          if (!existingRolePermission) {
            const rolePermission = this.rolePermissionRepository.create({
              role: { id: roleId },
              permission: { id: permission.id },
            });
            await this.rolePermissionRepository.save(rolePermission);
          }
        }
      }
    }
  }

  private async seedBasicPolicies(): Promise<void> {
    console.log('📜 Creating basic policies...');

    const basicPolicies = [
      {
        name: 'Owner Full Access',
        description: 'Tenant owners have full access to their tenant resources',
        resource: '*',
        action: '*',
        effect: 'allow' as const,
        priority: 100,
        conditions: {
          and: [
            { field: 'user.roles', operator: 'contains', value: 'Owner' },
            { field: 'tenant.id', operator: 'equals', value: '${context.tenantId}' }
          ]
        },
      },
      {
        name: 'Deny Inactive Users',
        description: 'Inactive users cannot access resources',
        resource: '*',
        action: '*',
        effect: 'deny' as const,
        priority: 200,
        conditions: {
          or: [
            { field: 'user.active', operator: 'equals', value: false },
            { field: 'user.status', operator: 'equals', value: 'inactive' }
          ]
        },
      },
    ];

    for (const policyData of basicPolicies) {
      const existingPolicy = await this.policyRepository.findOne({
        where: {
          name: policyData.name,
        },
      });

      if (!existingPolicy) {
        const policy = this.policyRepository.create({
          ...policyData,
        });
        await this.policyRepository.save(policy);
        console.log(`  ✓ Basic policy created: ${policyData.name}`);
      }
    }
  }
}