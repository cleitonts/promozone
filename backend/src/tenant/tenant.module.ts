import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TenantCreateDTO } from './tenant.create.dto';
import { TenantUpdateDTO } from './tenant.update.dto';
import { TenantDTO } from './tenant.dto';
import { TenantEntity } from './tenant.entity';
import { JwtAuthGuard } from '@/authorization/guards/jwt-auth.guard'
import { UserEntity } from '@/user/user.entity'
import { ProfileEntity } from '@/profile/profile.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TenantEntity, UserEntity, ProfileEntity])],
      resolvers: [
        {
          EntityClass: TenantEntity,
          DTOClass: TenantDTO,
          CreateDTOClass: TenantCreateDTO,
          UpdateDTOClass: TenantUpdateDTO,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: []
})
export class TenantModule {}