import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.prod', '.env.local', '.env', '.env.dist'],
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
        entities: [__dirname + '/**/entities/*.entity.js'],
        // autoLoadEntities: true, // Carrega automaticamente entidades registradas
        synchronize: configService.get('DATABASE_ORM_SYNC'), // NÃO use em produção!
      }),
    }),
    SecurityModule,
    UsersModule,
  ],
})
export class AppModule {}
