import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

@InputType('CreateAttribute')
export class AttributeCreateDTO {
  @IsString()
  @Field()
  name!: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}