import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Email to authenticate',
    minLength: 50,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'PassWordTest',
    description: 'Password to authenticate',
    minLength: 50,
    required: true,
  })
  @IsString()
  password: string;
}
