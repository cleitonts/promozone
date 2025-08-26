import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateProductVariantDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsNumber()
  @IsOptional()
  stock?: number = 0;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}