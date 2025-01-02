import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SignInHandler } from './commands/signin.handler';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SignInHandler, JwtStrategy, LocalStrategy],
  controllers: [SecurityController],
})
export class SecurityModule {}
