import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  password_repeat: string;

  @IsString()
  profilePicture?: string;
}
