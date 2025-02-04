import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from '../user-role.enum';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: EUserRole.USER,
    description: 'User role on the system',
    enum: EUserRole,
    examples: Object.values(EUserRole),
  })
  @IsEnum(EUserRole, { each: true })
  roles: EUserRole[];
}
