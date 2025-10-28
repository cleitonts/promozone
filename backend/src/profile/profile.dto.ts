import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Profile')
export class ProfileDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  tenantId!: string;

  @Field(() => [String])
  resolvers!: string[];

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}