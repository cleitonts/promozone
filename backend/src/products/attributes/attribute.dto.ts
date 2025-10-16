import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Attribute')
export class AttributeDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField({ nullable: true })
  description!: string;

  @FilterableField()
  active!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}