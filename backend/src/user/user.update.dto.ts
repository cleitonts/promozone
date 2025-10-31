import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { NameInput } from '../common/entity/name.input'
import { Type } from 'class-transformer';

@InputType('UpdateUser')
export class UserUpdateDTO {
  @ValidateNested()
  @IsOptional()
  @Type(() => NameInput)
  @Field(() => NameInput, { nullable: true })
  name?: NameInput;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  active?: boolean;

  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  roles?: string[];
}