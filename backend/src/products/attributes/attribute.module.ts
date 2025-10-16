import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { AttributeCreateDTO } from './attribute.create.dto';
import { AttributeDTO } from './attribute.dto';
import { AttributeEntity } from './attribute.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([AttributeEntity])],
      resolvers: [
        {
          EntityClass: AttributeEntity,
          DTOClass: AttributeDTO,
          CreateDTOClass: AttributeCreateDTO,
        },
      ],
    }),
  ],
})
export class AttributeModule {}