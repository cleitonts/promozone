import { FilterableField, IDField, Relation, UnPagedRelation } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { UserDTO } from '@/user/user.dto'
import { ProfileDTO } from '@/profile/profile.dto'

@ObjectType('Tenant')
@Relation('owner', () => UserDTO)
@UnPagedRelation('profiles', () => ProfileDTO)
export class TenantDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  ownerId!: string;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}
