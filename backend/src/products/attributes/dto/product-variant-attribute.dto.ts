import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductVariantAttributeDto {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  variantId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  attributeId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  valueId: number;
}

@InputType()
export class UpdateProductVariantAttributeDto {
  @Field(() => Int, { nullable: true })
  @IsInt()
  variantId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  attributeId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  valueId?: number;
}