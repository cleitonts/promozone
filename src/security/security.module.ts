import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SignInHandler } from './commands/signin.handler';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SignInHandler, Repository],
  controllers: [SecurityController],
})
export class SecurityModule {}
