import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { UserCreateDTO } from './user.create.dto';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

const nestjsQueryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([UserEntity])

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [nestjsQueryTypeOrmModule],
      resolvers: [
        {
          EntityClass: UserEntity,
          DTOClass: UserDTO,
          CreateDTOClass: UserCreateDTO,
        },
      ],
    }),
    nestjsQueryTypeOrmModule,
  ],
  exports: [nestjsQueryTypeOrmModule],
})
export class UserModule {}