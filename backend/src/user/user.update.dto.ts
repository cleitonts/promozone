import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

@InputType('UpdateUser')
export class UserUpdateDTO {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

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