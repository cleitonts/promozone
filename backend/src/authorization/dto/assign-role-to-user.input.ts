import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class AssignRoleToUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  tenantId?: string;
}