import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ProductVariantAttributeEntity } from './product-variant-attribute.entity';
import { ProductVariantAttributeDTO } from './product-variant-attribute.dto';
import { ProductVariantAttributeCreateDTO } from './product-variant-attribute.create.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProductVariantAttributeEntity])],
      resolvers: [
        {
          EntityClass: ProductVariantAttributeEntity,
          DTOClass: ProductVariantAttributeDTO,
          CreateDTOClass: ProductVariantAttributeCreateDTO,
        },
      ],
    }),
  ],
})
export class ProductVariantAttributeModule {}