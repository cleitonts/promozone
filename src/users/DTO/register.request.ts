export class RegisterRequest {
  constructor(
    public readonly username: string,
    public readonly name: string,
    public readonly password: string,
    public readonly password_repeat: string,
  ) {}
}
