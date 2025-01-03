import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly password_repeat: string;

  @IsString()
  readonly profilePicture?: string;

  constructor(props: {
    email: string;
    name: string;
    password: string;
    password_repeat: string;
    profilePicture?: string;
  }) {
    Object.assign(this, props);
  }
}
