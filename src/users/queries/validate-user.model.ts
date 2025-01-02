import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(props: { email?: string; password?: string }) {
    Object.assign(this, props);
  }
}
