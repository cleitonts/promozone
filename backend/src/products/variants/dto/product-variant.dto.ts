import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt } from 'class-validator';

@InputType()
export class CreateProductVariantDto {
  @Field(() => Int)
  @IsInt()
  productId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => Int)
  @IsInt()
  stock: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

@InputType()
export class UpdateProductVariantDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sku?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  stock?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}