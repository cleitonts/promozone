import { Field, InputType, Float } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional, IsNumber } from 'class-validator';

@InputType('CreateProduct')
export class ProductCreateDTO {
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

  @IsNumber()
  @Field(() => Float)
  price!: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  categoryId!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  brandId!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}