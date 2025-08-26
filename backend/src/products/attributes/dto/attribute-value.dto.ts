import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

@InputType()
export class CreateAttributeValueDto {
  @Field(() => Int)
  @IsInt()
  attributeId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  value: string;
}

@InputType()
export class UpdateAttributeValueDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  value?: string;
}