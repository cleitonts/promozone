import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { CategoryCreateDTO } from './category.create.dto';
import { CategoryDTO } from './category.dto';
import { CategoryEntity } from './category.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CategoryEntity])],
      resolvers: [
        {
          EntityClass: CategoryEntity,
          DTOClass: CategoryDTO,
          CreateDTOClass: CategoryCreateDTO,
        },
      ],
    }),
  ],
})
export class CategoryModule {}