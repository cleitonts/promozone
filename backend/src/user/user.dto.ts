import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { Name } from '@/common/entity/name.entity'

@ObjectType('User')
export class UserDTO {
  @IDField(() => ID)
  id!: string;

  @Field(() => Name)
  name!: Name;

  @FilterableField()
  email!: string;

  @FilterableField()
  active!: boolean;

  @FilterableField({ nullable: true })
  activeTenantId?: string;

  @Field(() => [String])
  roles!: string[];

  @Field(() => GraphQLISODateTime, { nullable: true })
  created?: Date;
}