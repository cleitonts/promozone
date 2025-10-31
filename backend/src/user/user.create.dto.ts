import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NameInput } from '../common/entity/name.input'

@InputType('CreateUser')
export class UserCreateDTO {
  @ValidateNested()
  @Type(() => NameInput)
  @Field(() => NameInput)
  name!: NameInput;

  @IsEmail()
  @Field()
  email!: string;

  @IsString()
  @Field()
  password!: string;

  @IsString()
  @Field()
  tenantId!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;

  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  roles?: string[];
}