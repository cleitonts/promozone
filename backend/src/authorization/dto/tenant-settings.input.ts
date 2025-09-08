import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class TenantSettingsInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  theme?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  features?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  customization?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  integrations?: string;
}