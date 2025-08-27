import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateAttributeDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdateAttributeDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}