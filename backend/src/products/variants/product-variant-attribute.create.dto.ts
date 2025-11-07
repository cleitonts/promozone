import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('CreateProductVariantAttribute')
export class ProductVariantAttributeCreateDTO {
  @IsString()
  @Field()
  variantId!: string;

  @IsString()
  @Field()
  attributeValueId!: string;
}