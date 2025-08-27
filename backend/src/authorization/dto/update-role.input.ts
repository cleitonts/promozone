import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}