import { ObjectType, Field } from '@nestjs/graphql';
import { Perfil } from '../../perfil/perfil.entity';

@ObjectType()
export class UserPayloadResponse {
  @Field()
  userId: string;

  @Field()
  username: string;

  @Field(() => Perfil)
  perfil: Perfil;
}
