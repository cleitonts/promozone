import { Body, Controller, Post, Param, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AppLogger } from 'src/common/logger.service';
import { User } from './user.entity';

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  @Roles('USERS:CREATE')
  async create(@Body() createUserRequest: CreateUserRequest) {
    this.logger.debug('Listing users');
    return await this.usersService.create(createUserRequest);
  }

  @Roles('USERS:READ')
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles('USERS:READ')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
