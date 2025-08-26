import { IsString, IsOptional, IsNumber } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  brandId?: number;
}