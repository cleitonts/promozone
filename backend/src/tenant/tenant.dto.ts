import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Tenant')
export class TenantDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  name!: string;

  @FilterableField()
  domain!: string;

  @FilterableField()
  active!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}