import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAttributeValueDto {
  @IsNumber()
  @IsNotEmpty()
  attributeId: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}