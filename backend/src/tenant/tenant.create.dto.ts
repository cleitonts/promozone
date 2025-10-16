import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

@InputType('CreateTenant')
export class TenantCreateDTO {
  @IsString()
  @Field()
  name!: string;

  @IsString()
  @Field()
  domain!: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  active!: boolean;
}