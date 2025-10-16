import { UserEntity } from "src/user/user.entity"

export type AuthenticatedUser = Pick<UserEntity, 'id' | 'email'>
export type JwtPayload = {
  sub: number
  username: string
}

export type UserContext = {
  req: {
    user: AuthenticatedUser
  }
}

export type UserWithoutPassword = Omit<UserEntity, 'password'>;

export interface ITokenPayload {
  username: string;
  sub: string;
  jti?: string;
  type: 'access' | 'refresh';
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IUserPayloadResponse {
  userId: string;
  username: string;
}