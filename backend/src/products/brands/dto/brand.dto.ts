import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateBrandDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdateBrandDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}