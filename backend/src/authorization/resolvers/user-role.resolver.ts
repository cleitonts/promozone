import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { Role } from '../entities/role.entity';
import { AuthorizationService, EffectivePermission } from '../authorization.service';
import { AssignRoleToUserInput } from '../dto';
import { UserPayloadResponse } from '../dto/user-payload.response';

@Resolver()
@UseGuards(GqlAuthGuard, PermissionsGuard)
export class UserRoleResolver {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Query(() => [Role])
  @Permissions('user:read-roles')
  async userRoles(
    @Args('userId') userId: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Role[]> {
    const userTenants = await this.authorizationService.getUserTenants(req.user.userId);
    const tenantId = userTenants.length > 0 ? userTenants[0].id : undefined;
    return this.authorizationService.getUserRoles(userId, tenantId);
  }

  @Query(() => [String])
  @Permissions('user:read-permissions')
  async userPermissions(
    @Args('userId') userId: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<string[]> {
    const userTenants = await this.authorizationService.getUserTenants(req.user.userId);
    const tenantId = userTenants.length > 0 ? userTenants[0].id : undefined;
    const permissions = await this.authorizationService.getUserEffectivePermissions(userId, tenantId);
    return permissions.map(p => p.name);
  }

  @Mutation(() => Boolean)
  @Permissions('user:assign-role')
  async assignRoleToUser(
    @Args('input') input: AssignRoleToUserInput,
  ): Promise<boolean> {
    const tenantId = input.tenantId;
    await this.authorizationService.assignRoleToUser(
      input.userId,
      input.roleId,
      tenantId,
    );
    return true;
  }

  @Mutation(() => Boolean)
  @Permissions('user:remove-role')
  async removeRoleFromUser(
    @Args('input') input: AssignRoleToUserInput,
  ): Promise<boolean> {
    const tenantId = input.tenantId;
    await this.authorizationService.removeRoleFromUser(
      input.userId,
      input.roleId,
      tenantId,
    );
    return true;
  }
}