import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType('UpdateActiveTenantInput')
export class UpdateActiveTenantInputDTO {
  @IsString()
  @IsNotEmpty()
  @Field()
  tenantId!: string;
}