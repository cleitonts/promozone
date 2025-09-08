import { forwardRef, Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationService } from './authorization.service';
import { AuthService } from './services/auth.service';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { PermissionsGuard } from './guards/permissions.guard';
import { PolicyService } from './services/policy.service';
import { PolicyEvaluatorService } from './services/policy-evaluator.service';
import { AuthorizationSeedService } from './seeds/authorization.seed';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { RolePermission } from './entities/role-permission.entity';
import { UserRole } from './entities/user-role.entity';
import { Policy } from './entities/policy.entity';
import { Tenant } from './entities/tenant.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthResolver, RoleResolver, PermissionResolver, UserRoleResolver, TenantResolver } from './resolvers';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Permission,
      Role,
      RolePermission,
      UserRole,
      Policy,
      Tenant,
    ]),
  ],
  providers: [
    AuthService,
    AuthorizationService,
    PolicyService,
    PolicyEvaluatorService,
    TenantMiddleware,
    PermissionsGuard,
    AuthorizationSeedService,
    JwtStrategy,
    AuthResolver,
    RoleResolver,
    PermissionResolver,
    UserRoleResolver,
    TenantResolver,
  ],
  exports: [AuthService, AuthorizationService, PolicyService, PermissionsGuard, AuthorizationSeedService],
})
export class AuthorizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('*'); // Aplicar a todas as rotas
  }
}