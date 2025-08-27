import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppLogger } from './common/logger.service';
import { PerfilModule } from './perfil/perfil.module';
import { ProductsModule } from './products/products.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    PerfilModule,
    AuthorizationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.prod', '.env.local', '.env', '.env.dist'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req }: any) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => ({
        type: configService.get('DATABASE_TYPE'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity.js'],
        autoLoadEntities: true, // Carrega automaticamente entidades registradas
        synchronize: configService.get('DATABASE_ORM_SYNC'), // NÃO use em produção!
      }),
    }),
    WinstonModule.forRootAsync({
      useClass: AppLogger,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
