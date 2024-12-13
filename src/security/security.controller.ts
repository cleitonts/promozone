import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SigninRequest } from './DTO/signin.request';
import { plainToClass } from 'class-transformer';
import { SignInModel } from './commands/signin.model';

@Controller('auth')
export class SecurityController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signinDTO: SigninRequest) {
    return await this.commandBus.execute(plainToClass(SignInModel, signinDTO));
  }
}
