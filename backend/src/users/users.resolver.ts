import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './user.entity';
import { GqlAuthGuard } from 'src/authorization/guards/gql-auth.guard';
import { AppLogger } from 'src/common/logger.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: AppLogger,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserRequest: CreateUserRequest) {
    this.logger.debug('Creating user');
    return await this.usersService.create(createUserRequest);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string) {
    return await this.usersService.findOne(id);
  }
}