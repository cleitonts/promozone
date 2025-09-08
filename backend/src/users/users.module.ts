import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { AdminSeeder } from './scripts/admin.seed';
import { PerfilModule } from 'src/perfil/perfil.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PerfilModule, AuthorizationModule],
  providers: [UsersService, UsersResolver, AdminSeeder],

  exports: [UsersService],
})
export class UsersModule {}
