import { Field, InputType, Float, Int } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional, IsNumber } from 'class-validator';

@InputType('CreateProductVariant')
export class ProductVariantCreateDTO {
  @IsString()
  @Field()
  productId!: string;

  @IsString()
  @Field()
  sku!: string;

  @IsNumber()
  @Field(() => Float)
  price!: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { defaultValue: 0 })
  stock!: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  imageUrl!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}