import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  resource: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  action: string;

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