import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl, ValidateIf } from 'class-validator';

@InputType()
export class CreateBrandDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @ValidateIf((o) => o.logo_url && o.logo_url.trim() !== '')
  @IsUrl()
  @IsOptional()
  logo_url?: string;

  @Field({ nullable: true })
  @ValidateIf((o) => o.website && o.website.trim() !== '')
  @IsUrl()
  @IsOptional()
  website?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

@InputType()
export class UpdateBrandDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @ValidateIf((o) => o.logo_url && o.logo_url.trim() !== '')
  @IsUrl()
  @IsOptional()
  logo_url?: string;

  @Field({ nullable: true })
  @ValidateIf((o) => o.website && o.website.trim() !== '')
  @IsUrl()
  @IsOptional()
  website?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}