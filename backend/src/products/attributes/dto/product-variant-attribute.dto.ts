import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductVariantAttributeDto {
  @IsNumber()
  @IsNotEmpty()
  variantId: number;

  @IsNumber()
  @IsNotEmpty()
  attributeId: number;

  @IsNumber()
  @IsNotEmpty()
  valueId: number;
}