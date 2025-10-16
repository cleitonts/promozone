import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { AttributeValueCreateDTO } from './attribute-value.create.dto';
import { AttributeValueDTO } from './attribute-value.dto';
import { AttributeValueEntity } from './attribute-value.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([AttributeValueEntity])],
      resolvers: [
        {
          EntityClass: AttributeValueEntity,
          DTOClass: AttributeValueDTO,
          CreateDTOClass: AttributeValueCreateDTO,
        },
      ],
    }),
  ],
})
export class AttributeValueModule {}