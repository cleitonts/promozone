import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { ProductVariantCreateDTO } from './product-variant.create.dto';
import { ProductVariantDTO } from './product-variant.dto';
import { ProductVariantEntity } from './product-variant.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProductVariantEntity])],
      resolvers: [
        {
          EntityClass: ProductVariantEntity,
          DTOClass: ProductVariantDTO,
          CreateDTOClass: ProductVariantCreateDTO,
        },
      ],
    }),
  ],
})
export class ProductVariantModule {}