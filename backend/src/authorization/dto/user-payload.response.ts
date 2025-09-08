import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserPayloadResponse {
  @Field()
  userId: string;

  @Field()
  username: string;
}
