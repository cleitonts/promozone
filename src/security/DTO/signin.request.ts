export class SigninRequest {
  username: string;
  password: string;
  constructor(props: { username?: string; password?: string }) {
    Object.assign(this, props);
  }
}
