import { Body, Controller, Post, Param, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { EUserRole } from './user-role.enum';
import { AppLogger } from 'src/common/logger.service';
import { ApiResponse } from 'src/common/dto/api.response';
import { User } from './user.entity';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  async create(@Body() createUserRequest: CreateUserRequest) {
    this.logger.debug('Listing users');
    return this.usersService.create(createUserRequest);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  @Get()
  async findAll(): Promise<ApiResponse<User[]>> {
    return ApiResponse.success(await this.usersService.findAll());
  }

  @Get(':id')
  @Roles(EUserRole.ADMIN, EUserRole.USER)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
