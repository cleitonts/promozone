import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { Permission } from '../entities/permission.entity';
import { AuthorizationService } from '../authorization.service';
import {
  CreatePermissionInput,
  UpdatePermissionInput,
} from '../dto';
import { UserPayloadResponse } from '../dto/user-payload.response';

@Resolver(() => Permission)
@UseGuards(GqlAuthGuard, PermissionsGuard)
export class PermissionResolver {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Query(() => [Permission])
  @Permissions('permission:read')
  async permissions(
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Permission[]> {
    const tenantId = req.user.tenantId;
    return this.authorizationService.getPermissions(tenantId);
  }

  @Query(() => Permission, { nullable: true })
  @Permissions('permission:read')
  async permission(
    @Args('id') id: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Permission | null> {
    const tenantId = req.user.tenantId;
    return this.authorizationService.getPermissionById(id, tenantId);
  }

  @Mutation(() => Permission)
  @Permissions('permission:create')
  async createPermission(
    @Args('input') input: CreatePermissionInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Permission> {
    return this.authorizationService.createPermission({
      resource: input.resource,
      action: input.action,
      description: input.description,
    });
  }

  @Mutation(() => Permission)
  @Permissions('permission:update')
  async updatePermission(
    @Args('input') input: UpdatePermissionInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Permission> {
    const tenantId = req.user.tenantId;
    return this.authorizationService.updatePermission(input.id, input, tenantId);
  }

  @Mutation(() => Boolean)
  @Permissions('permission:delete')
  async deletePermission(
    @Args('id') id: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<boolean> {
    const tenantId = req.user.tenantId;
    await this.authorizationService.deletePermission(id, tenantId);
    return true;
  }
}