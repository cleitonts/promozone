import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID, Float } from '@nestjs/graphql';

@ObjectType('Product')
export class ProductDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  slug!: string;

  @FilterableField({ nullable: true })
  description!: string;

  @FilterableField(() => Float)
  price!: number;

  @FilterableField({ nullable: true })
  categoryId!: string;

  @FilterableField({ nullable: true })
  brandId!: string;

  @FilterableField()
  active!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}