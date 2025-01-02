import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SigninRequest } from './DTO/signin.request';
import { plainToClass } from 'class-transformer';
import { SignInModel } from './commands/signin.model';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class SecurityController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() signinDTO: SigninRequest) {
    return await this.commandBus.execute(plainToClass(SignInModel, signinDTO));
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: ExpressRequest) {
    return req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        // Aqui você pode tratar o erro, caso necessário
      } else {
        // Sucesso no logout
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
