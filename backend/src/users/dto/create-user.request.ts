import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: UserRole.USER,
    description: 'User role on the system',
    enum: UserRole,
    examples: Object.values(UserRole),
  })
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}
