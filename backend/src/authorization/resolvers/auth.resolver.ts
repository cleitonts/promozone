import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService, ITokenPair } from '../services/auth.service';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  tenantId?: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<ITokenPair> {
    return await this.authService.login(loginInput.email, loginInput.password, loginInput.tenantId);
  }

  @Mutation(() => AuthResponse)
  async refreshTokens(@Args('refreshToken') refreshToken: string): Promise<ITokenPair> {
    return await this.authService.refreshTokens(refreshToken);
  }

  @Mutation(() => LogoutResponse)
  async logout(): Promise<LogoutResponse> {
    return { message: 'success' };
  }
}