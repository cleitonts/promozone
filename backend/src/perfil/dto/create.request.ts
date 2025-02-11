import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString, Validate } from 'class-validator';
import { isValidPermission } from '../permission.validator';

export class CreateRequest {
  name: string;

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
