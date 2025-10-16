import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsEmail, IsOptional } from 'class-validator';

@InputType('CreateUser')
export class UserCreateDTO {
  @IsString()
  @Field()
  name!: string;

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
}