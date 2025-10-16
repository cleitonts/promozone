import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

@InputType('CreateAttributeValue')
export class AttributeValueCreateDTO {
  @IsString()
  @Field()
  attributeId!: string;

  @IsString()
  @Field()
  value!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}