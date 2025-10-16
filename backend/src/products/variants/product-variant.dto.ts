import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType('ProductVariant')
export class ProductVariantDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  productId!: string;

  @FilterableField()
  sku!: string;

  @FilterableField(() => Float)
  price!: number;

  @FilterableField(() => Int)
  stock!: number;

  @FilterableField({ nullable: true })
  imageUrl!: string;

  @FilterableField()
  active!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}