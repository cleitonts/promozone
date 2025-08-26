import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString, Validate } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { isValidPermission } from '../permission.validator';

@InputType()
export class UpdateRequest {
  @Field()
  name: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Validate(isValidPermission, { each: true })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return value;
    return value.map((v) => v.toUpperCase());
  })
  permissions?: string[];
}
