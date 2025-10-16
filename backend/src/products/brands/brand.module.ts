import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { BrandCreateDTO } from './brand.create.dto';
import { BrandDTO } from './brand.dto';
import { BrandEntity } from './brand.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([BrandEntity])],
      resolvers: [
        {
          EntityClass: BrandEntity,
          DTOClass: BrandDTO,
          CreateDTOClass: BrandCreateDTO,
        },
      ],
    }),
  ],
})
export class BrandModule {}