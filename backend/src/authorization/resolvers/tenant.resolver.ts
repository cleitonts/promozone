import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { Tenant } from '../entities/tenant.entity';
import { AuthorizationService } from '../authorization.service';
import { UserPayloadResponse } from '../dto/user-payload.response';
import {
  CreateTenantInput,
  UpdateTenantInput,
  AddUserToTenantInput,
  RemoveUserFromTenantInput,
} from '../dto';

@Resolver(() => Tenant)
@UseGuards(GqlAuthGuard, PermissionsGuard)
export class TenantResolver {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Query(() => [Tenant])
  @Permissions('tenant.read')
  async tenants(
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Tenant[]> {
    return this.authorizationService.getUserTenants(req.user.userId);
  }

  @Query(() => Tenant, { nullable: true })
  @Permissions('tenant:read')
  async tenant(
    @Args('id') id: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Tenant | null> {
    const userTenants = await this.authorizationService.getUserTenants(req.user.userId);
    const tenant = userTenants.find(t => t.id === id);
    
    if (!tenant) {
      throw new Error('Tenant not found or access denied');
    }
    
    return tenant;
  }

  @Mutation(() => Tenant)
  @Permissions('tenant.create')
  async createTenant(
    @Args('input') input: CreateTenantInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Tenant> {
    const canCreate = await this.authorizationService.canCreateTenantOwner(req.user.userId);
    if (!canCreate) {
      throw new Error('Only global admins can create tenants');
    }

    return this.authorizationService.createTenant({
      name: input.name,
      description: input.description,
      slug: input.slug,
      domain: input.domain,
      ownerId: input.ownerId || req.user.userId,
      settings: input.settings,
    });
  }

  @Mutation(() => Tenant)
  @Permissions('tenant.write')
  async updateTenant(
    @Args('input') input: UpdateTenantInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Tenant> {
    const canEdit = await this.authorizationService.canAddUserToTenant(req.user.userId, input.id);
    if (!canEdit) {
      throw new Error('Only tenant owners or global admins can edit a tenant');
    }

    return this.authorizationService.updateTenant(input.id, {
      name: input.name,
      description: input.description,
      domain: input.domain,
      settings: input.settings,
    });
  }

  @Mutation(() => Boolean)
  @Permissions('tenant:delete')
  async deleteTenant(
    @Args('id') id: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<boolean> {
    const canDelete = await this.authorizationService.isOwnerOfTenant(req.user.userId, id) ||
                     await this.authorizationService.isSuperuser(req.user.userId);
    
    if (!canDelete) {
      throw new Error('Only tenant owners or superusers can delete a tenant');
    }

    await this.authorizationService.deleteTenant(id);
    return true;
  }

  @Mutation(() => Boolean)
  @Permissions('roles.assign')
  async addUserToTenant(
    @Args('input') input: AddUserToTenantInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<boolean> {
    const canAdd = await this.authorizationService.canAddUserToTenant(req.user.userId, input.tenantId);
    if (!canAdd) {
      throw new Error('Only tenant owners or global admins can add users to a tenant');
    }

    await this.authorizationService.assignRoleToUser(
      input.userId,
      input.roleId,
      input.tenantId
    );

    return true;
  }

  @Mutation(() => Boolean)
  @Permissions('roles.assign')
  async removeUserFromTenant(
    @Args('input') input: RemoveUserFromTenantInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<boolean> {
    const canRemove = await this.authorizationService.canAddUserToTenant(req.user.userId, input.tenantId);
    if (!canRemove) {
      throw new Error('Only tenant owners or global admins can remove users from a tenant');
    }

    await this.authorizationService.removeRoleFromUser(
      input.userId,
      input.roleId,
      input.tenantId
    );

    return true;
  }
}