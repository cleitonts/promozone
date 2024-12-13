import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { findOneHandler } from './queries/find-one.handler';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterHandler } from './commands/register.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [findOneHandler, RegisterHandler],
  controllers: [UsersController],
})
export class UsersModule {}
