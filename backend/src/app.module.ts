import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TodoItemModule } from './todo-item/todo-item.module'
import { TenantModule } from './tenant/tenant.module'
import { UserModule } from './user/user.module'
import { ProductsModule } from './products/products.module'
import { AuthModule } from './authorization/auth.module'
import { SeedComposite } from '@/seed/seed.composite'
import typeorm, { envFiles } from './data-source';
import { ProfileModule } from './profile/profile.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFiles,
      load: [typeorm],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty', options: { singleLine: true } } : undefined,
        redact: ['req.headers.authorization'],
        autoLogging: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeormConfig = configService.get('typeorm');
        if (!typeormConfig) {
          throw new Error('Missing TypeORM configuration');
        }
        return typeormConfig;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TodoItemModule,
    TenantModule,
    UserModule,
    ProductsModule,
    AuthModule,
    ProfileModule,
  ],
  providers: [SeedComposite],
  exports: [SeedComposite],
})
export class AppModule {}