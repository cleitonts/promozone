import { User } from '../entities/user.entity';

export class UserResponse {
  public readonly id: string;
  public readonly name: string;
  public readonly username: string;

  public static createFromEntity(params: User): UserResponse {
    return Object.assign(new UserResponse(), params);
  }
}
