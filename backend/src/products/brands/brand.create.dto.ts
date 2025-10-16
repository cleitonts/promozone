import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

@InputType('CreateBrand')
export class BrandCreateDTO {
  @IsString()
  @Field()
  name!: string;

  @IsString()
  @Field()
  slug!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  logoUrl!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  website!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  country!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}