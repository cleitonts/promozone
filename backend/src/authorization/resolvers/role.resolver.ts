import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { Role } from '../entities/role.entity';
import { AuthorizationService } from '../authorization.service';
import {
  CreateRoleInput,
  UpdateRoleInput,
  AssignPermissionToRoleInput,
} from '../dto';
import { UserPayloadResponse } from '../dto/user-payload.response';

@Resolver(() => Role)
@UseGuards(GqlAuthGuard, PermissionsGuard)
export class RoleResolver {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Query(() => [Role])
  @Permissions('role:read')
  async roles(
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Role[]> {
    const tenantId = req.user.tenantId;
    return this.authorizationService.getRoles(tenantId);
  }

  @Query(() => Role, { nullable: true })
  @Permissions('role:read')
  async role(
    @Args('id') id: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Role | null> {
    const tenantId = req.user.tenantId;
    return this.authorizationService.getRoleById(id, tenantId);
  }

  @Mutation(() => Role)
  @Permissions('role:create')
  async createRole(
    @Args('input') input: CreateRoleInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Role> {
    const tenantId = input.tenantId || req.user.tenantId;
    const roleData: any = {
      name: input.name,
      description: input.description,
      isGlobal: input.isGlobal || false,
    };
    
    if (tenantId) {
      roleData.tenant = { id: tenantId };
    }
    
    return this.authorizationService.createRole(roleData);
  }

  @Mutation(() => Role)
  @Permissions('role:update')
  async updateRole(
    @Args('input') input: UpdateRoleInput,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<Role> {
    const tenantId = req.user.tenantId;
    return this.authorizationService.updateRole(input.id, input, tenantId);
  }

  @Mutation(() => Boolean)
  @Permissions('role:delete')
  async deleteRole(
    @Args('id') id: string,
    @Context('req') req: { user: UserPayloadResponse },
  ): Promise<boolean> {
    const tenantId = req.user.tenantId;
    await this.authorizationService.deleteRole(id, tenantId);
    return true;
  }

  @Mutation(() => Boolean)
  @Permissions('role:assign-permission')
  async assignPermissionToRole(
    @Args('input') input: AssignPermissionToRoleInput,
  ): Promise<boolean> {
    await this.authorizationService.assignPermissionToRole(
      input.roleId,
      input.permissionId,
    );
    return true;
  }

  @Mutation(() => Boolean)
  @Permissions('role:remove-permission')
  async removePermissionFromRole(
    @Args('input') input: AssignPermissionToRoleInput,
  ): Promise<boolean> {
    await this.authorizationService.removePermissionFromRole(
      input.roleId,
      input.permissionId,
    );
    return true;
  }
}