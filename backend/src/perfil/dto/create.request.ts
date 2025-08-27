import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequest {
  @Field()
  name: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return value;
    return value.map((v) => v.toUpperCase());
  })
  permissions?: string[];
}
