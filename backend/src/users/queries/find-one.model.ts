import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindOneModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(props: { email: string }) {
    Object.assign(this, props);
  }
}
