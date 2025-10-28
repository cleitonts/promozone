import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('User')
export class UserDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  email!: string;

  @FilterableField()
  active!: boolean;

  @FilterableField()
  tenantId!: string;

  @Field(() => [String])
  roles!: string[];

  @Field(() => GraphQLISODateTime)
  created!: Date;
}