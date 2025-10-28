import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

@InputType('CreateProfile')
export class ProfileCreateDTO {
  @IsString()
  @Field()
  tenantId!: string;

  @IsArray()
  @ArrayNotEmpty()
  @Field(() => [String])
  resolvers!: string[];
}