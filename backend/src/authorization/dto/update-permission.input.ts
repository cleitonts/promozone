import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreatePermissionInput } from './create-permission.input';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}