export class SigninRequest {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
