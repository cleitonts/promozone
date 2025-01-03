import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { findOneHandler } from './queries/find-one.handler';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterHandler } from './commands/register.handler';
import { ValidateUserHandler } from './queries/validate-user.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [findOneHandler, RegisterHandler, ValidateUserHandler],
  controllers: [UsersController],
})
export class UsersModule {}
