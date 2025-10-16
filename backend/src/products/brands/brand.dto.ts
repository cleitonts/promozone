import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Brand')
export class BrandDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  slug!: string;

  @FilterableField({ nullable: true })
  description!: string;

  @FilterableField({ nullable: true })
  logoUrl!: string;

  @FilterableField({ nullable: true })
  website!: string;

  @FilterableField({ nullable: true })
  country!: string;

  @FilterableField()
  active!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}