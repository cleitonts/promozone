import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AdminSeeder } from './scripts/admin.seed';
import { PerfilModule } from 'src/perfil/perfil.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PerfilModule],
  providers: [UsersService, AdminSeeder],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
