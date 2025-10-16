import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('AttributeValue')
export class AttributeValueDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  attributeId!: string;

  @FilterableField()
  value!: string;

  @FilterableField()
  active!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}