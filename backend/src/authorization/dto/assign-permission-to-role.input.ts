import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class AssignPermissionToRoleInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  permissionId: string;
}