import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { CreateUserRequest } from './create-user.request';

@InputType()
export class UpdateUserRequest extends PartialType(CreateUserRequest) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  currentPassword?: string;
}
