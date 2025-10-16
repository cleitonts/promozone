import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TenantCreateDTO } from './tenant.create.dto';
import { TenantDTO } from './tenant.dto';
import { TenantEntity } from './tenant.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TenantEntity])],
      resolvers: [
        {
          EntityClass: TenantEntity,
          DTOClass: TenantDTO,
          CreateDTOClass: TenantCreateDTO,
        },
      ],
    }),
  ],
})
export class TenantModule {}