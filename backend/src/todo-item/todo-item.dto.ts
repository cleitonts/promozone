import { Authorize, FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { Authorizer } from 'src/Common/Authorizer';

@ObjectType('TodoItem')
@Authorize(Authorizer<TodoItemDTO>)
export class TodoItemDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  title!: string;

  @FilterableField()
  completed!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}

