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

  /**
   * Executa todos os seeds de autorização
   */
  async seedAll(): Promise<void> {
    console.log('🌱 Iniciando seeds de autorização...');
    
    await this.seedGlobalPermissions();
    await this.seedGlobalRoles();
    await this.seedBasicPolicies();
    
    console.log('✅ Seeds de autorização concluídos!');
  }

  /**
   * Cria permissões globais básicas
   */
  private async seedGlobalPermissions(): Promise<void> {
    console.log('📋 Criando permissões globais...');

    const globalPermissions = [
      // Permissões de usuários
      { resource: 'users', action: 'read', name: 'users.read', description: 'Visualizar usuários' },
      { resource: 'users', action: 'write', name: 'users.write', description: 'Criar e editar usuários' },
      { resource: 'users', action: 'delete', name: 'users.delete', description: 'Excluir usuários' },
      { resource: 'users', action: 'manage', name: 'users.manage', description: 'Gerenciar usuários completamente' },

      // Permissões de roles
      { resource: 'roles', action: 'read', name: 'roles.read', description: 'Visualizar roles' },
      { resource: 'roles', action: 'write', name: 'roles.write', description: 'Criar e editar roles' },
      { resource: 'roles', action: 'delete', name: 'roles.delete', description: 'Excluir roles' },
      { resource: 'roles', action: 'assign', name: 'roles.assign', description: 'Atribuir roles a usuários' },

      // Permissões de permissões
      { resource: 'permissions', action: 'read', name: 'permissions.read', description: 'Visualizar permissões' },
      { resource: 'permissions', action: 'write', name: 'permissions.write', description: 'Criar e editar permissões' },
      { resource: 'permissions', action: 'delete', name: 'permissions.delete', description: 'Excluir permissões' },

      // Permissões de políticas
      { resource: 'policies', action: 'read', name: 'policies.read', description: 'Visualizar políticas' },
      { resource: 'policies', action: 'write', name: 'policies.write', description: 'Criar e editar políticas' },
      { resource: 'policies', action: 'delete', name: 'policies.delete', description: 'Excluir políticas' },

      // Permissões de tenant
      { resource: 'tenant', action: 'read', name: 'tenant.read', description: 'Visualizar informações do tenant' },
      { resource: 'tenant', action: 'write', name: 'tenant.write', description: 'Editar configurações do tenant' },
      { resource: 'tenant', action: 'manage', name: 'tenant.manage', description: 'Gerenciar tenant completamente' },

      // Permissões de produtos (exemplo de domínio específico)
      { resource: 'products', action: 'read', name: 'products.read', description: 'Visualizar produtos' },
      { resource: 'products', action: 'write', name: 'products.write', description: 'Criar e editar produtos' },
      { resource: 'products', action: 'delete', name: 'products.delete', description: 'Excluir produtos' },
      { resource: 'products', action: 'publish', name: 'products.publish', description: 'Publicar produtos' },

      // Permissões de categorias
      { resource: 'categories', action: 'read', name: 'categories.read', description: 'Visualizar categorias' },
      { resource: 'categories', action: 'write', name: 'categories.write', description: 'Criar e editar categorias' },
      { resource: 'categories', action: 'delete', name: 'categories.delete', description: 'Excluir categorias' },

      // Permissões de marcas
      { resource: 'brands', action: 'read', name: 'brands.read', description: 'Visualizar marcas' },
      { resource: 'brands', action: 'write', name: 'brands.write', description: 'Criar e editar marcas' },
      { resource: 'brands', action: 'delete', name: 'brands.delete', description: 'Excluir marcas' },

      // Permissões de relatórios
      { resource: 'reports', action: 'read', name: 'reports.read', description: 'Visualizar relatórios' },
      { resource: 'reports', action: 'export', name: 'reports.export', description: 'Exportar relatórios' },

      // Permissões de configurações
      { resource: 'settings', action: 'read', name: 'settings.read', description: 'Visualizar configurações' },
      { resource: 'settings', action: 'write', name: 'settings.write', description: 'Editar configurações' },
    ];

    for (const permissionData of globalPermissions) {
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
        console.log(`  ✓ Permissão criada: ${permissionData.name}`);
      }
    }
  }

  /**
   * Cria roles globais básicos
   */
  private async seedGlobalRoles(): Promise<void> {
    console.log('👑 Criando roles globais...');

    const globalRoles = [
      {
        name: 'Super Admin',
        description: 'Acesso total ao sistema, incluindo gerenciamento de tenants',
        permissions: ['*'], // Todas as permissões
      },
      {
        name: 'Owner',
        description: 'Proprietário do tenant com acesso total às funcionalidades do tenant',
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
        description: 'Administrador do tenant com acesso a maioria das funcionalidades',
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
        description: 'Gerente com acesso a funcionalidades de gestão de produtos',
        permissions: [
          'users.read', 'products.read', 'products.write', 'products.publish',
          'categories.read', 'categories.write',
          'brands.read', 'brands.write',
          'reports.read'
        ],
      },
      {
        name: 'Editor',
        description: 'Editor com acesso a criação e edição de conteúdo',
        permissions: [
          'products.read', 'products.write',
          'categories.read', 'brands.read'
        ],
      },
      {
        name: 'Viewer',
        description: 'Visualizador com acesso apenas de leitura',
        permissions: [
          'products.read', 'categories.read', 'brands.read', 'reports.read'
        ],
      },
    ];

    for (const roleData of globalRoles) {
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
        console.log(`  ✓ Role criado: ${roleData.name}`);

        // Atribuir permissões ao role
        await this.assignPermissionsToRole(savedRole.id, roleData.permissions);
      }
    }
  }

  /**
   * Atribui permissões a um role
   */
  private async assignPermissionsToRole(
    roleId: string,
    permissionNames: string[],
  ): Promise<void> {
    for (const permissionName of permissionNames) {
      if (permissionName === '*') {
        // Atribuir todas as permissões
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

  /**
   * Cria políticas básicas
   */
  private async seedBasicPolicies(): Promise<void> {
    console.log('📜 Criando políticas básicas...');

    const basicPolicies = [
      {
        name: 'Owner Full Access',
        description: 'Proprietários têm acesso total aos recursos do seu tenant',
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
        description: 'Usuários inativos não podem acessar recursos',
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
        console.log(`  ✓ Política criada: ${policyData.name}`);
      }
    }
  }
}