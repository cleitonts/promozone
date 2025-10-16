import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

@InputType('CreateCategory')
export class CategoryCreateDTO {
  @IsString()
  @Field()
  name!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description!: string;

  @IsString()
  @Field()
  slug!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}