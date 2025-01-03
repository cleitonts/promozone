import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterRequest } from './DTO/register.request';
import { RegisterModel } from './commands/register.model';
import { plainToClass } from 'class-transformer';
import { FindOneModel } from './queries/find-one.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterRequest) {
    return await this.commandBus.execute(
      plainToClass(RegisterModel, registerDTO),
    );
  }

  @Get(':username')
  async getByUsername(@Param('username') email: string) {
    return await this.queryBus.execute(new FindOneModel({ email }));
  }
}
