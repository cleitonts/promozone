import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AdminSeeder } from './scripts/admin.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AdminSeeder],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
