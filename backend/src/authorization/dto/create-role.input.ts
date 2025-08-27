import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isGlobal?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  tenantId?: string;
}