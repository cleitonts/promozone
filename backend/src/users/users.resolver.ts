import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './user.entity';
import { UserInfoResponse } from './dto/user-info.response';
import { GqlAuthGuard } from 'src/authorization/guards/gql-auth.guard';
import { PermissionsGuard } from 'src/authorization/guards/permissions.guard';
import { Permissions } from 'src/authorization/decorators/permissions.decorator';
import { AppLogger } from 'src/common/logger.service';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { UserPayloadResponse } from 'src/authorization/dto/user-payload.response';

@Resolver(() => User)
@UseGuards(GqlAuthGuard, PermissionsGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authorizationService: AuthorizationService,
    private readonly logger: AppLogger,
  ) {}

  @Mutation(() => User)
  @Permissions('users.create')
  async createUser(@Args('createUserInput') createUserRequest: CreateUserRequest) {
    this.logger.debug('Creating user');
    return await this.usersService.create(createUserRequest);
  }

  @Query(() => [User], { name: 'users' })
  @Permissions('users.read')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @Permissions('users.read')
  async findOne(@Args('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@Context('req') req: { user: { sub: string } }) {
    return await this.usersService.findOne(req.user.sub);
  }

  @Query(() => UserInfoResponse, { name: 'userInfo' })
  @UseGuards(GqlAuthGuard)
  async userInfo(@Context('req') req: { user: UserPayloadResponse }): Promise<UserInfoResponse> {
    const user = await this.usersService.findOne(req.user.userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const userRoles = await this.authorizationService.getUserRoles(req.user.userId);
    const userEffectivePermissions = await this.authorizationService.getUserEffectivePermissions(req.user.userId);
    const userTenants = await this.authorizationService.getUserTenants(req.user.userId);

    const permissions = userEffectivePermissions.map(ep => ({
      resource: ep.resource,
      action: ep.action,
      name: ep.name,
    }));

    return {
      user,
      roles: userRoles,
      permissions,
      tenants: userTenants,
      currentTenantId: userTenants.length > 0 ? userTenants[0].id : undefined,
    };
  }
}