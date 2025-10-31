import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserEntity } from '../user/user.entity'
import { TenantEntity } from '@/tenant/tenant.entity'
import { ProfileEntity } from '@/profile/profile.entity'
import { SeedService } from './seed/auth.seed'
import { SEEDER } from '@/seed/seed.token'
import { DiscoveryModule } from '@nestjs/core'
import { ResolverScannerService } from './resolver-scanner.service'

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, TenantEntity, ProfileEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get('JWT_EXPIRES_IN')),
        },
      }),
      inject: [ConfigService],
    }),
    DiscoveryModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    SeedService,
    { provide: SEEDER, useExisting: SeedService },
    ResolverScannerService,
  ],
  exports: [AuthService, SEEDER],
})
export class AuthModule {}