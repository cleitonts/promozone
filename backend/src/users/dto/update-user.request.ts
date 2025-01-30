import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateUserRequest } from './create-user.request';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {
  @IsOptional()
  @IsString()
  currentPassword?: string; // Para alteração segura de senha
}
