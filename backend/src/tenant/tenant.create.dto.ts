import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('CreateTenant')
export class TenantCreateDTO {
  @IsString()
  @Field()
  name!: string;

  @IsString()
  @Field()
  ownerId!: string;
}