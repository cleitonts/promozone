import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('ProductVariantAttribute')
export class ProductVariantAttributeDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  variantId!: string;

  @FilterableField()
  attributeValueId!: string;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}