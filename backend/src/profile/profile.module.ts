import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { ProfileEntity } from './profile.entity';
import { ProfileDTO } from './profile.dto';
import { ProfileCreateDTO } from './profile.create.dto';
import { JwtAuthGuard } from '@/authorization/guards/jwt-auth.guard'
import { UserEntity } from '@/user/user.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProfileEntity, UserEntity])],
      resolvers: [
        {
          EntityClass: ProfileEntity,
          DTOClass: ProfileDTO,
          CreateDTOClass: ProfileCreateDTO,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
})
export class ProfileModule {}