import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { ProductCreateDTO } from './product.create.dto';
import { ProductDTO } from './product.dto';
import { ProductEntity } from './product.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProductEntity])],
      resolvers: [
        {
          EntityClass: ProductEntity,
          DTOClass: ProductDTO,
          CreateDTOClass: ProductCreateDTO,
        },
      ],
    }),
  ],
})
export class ProductModule {}