import { FilterableField, IDField, UnPagedRelation } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { UserDTO } from '@/user/user.dto'

@ObjectType('Profile')
@UnPagedRelation('users', () => UserDTO)
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