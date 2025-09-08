import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class AddUserToTenantInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  roleId: string;
}

@InputType()
export class RemoveUserFromTenantInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  roleId: string;
}