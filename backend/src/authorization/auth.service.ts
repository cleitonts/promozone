import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { UserEntity } from '../user/user.entity';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { IUserPayloadResponse, ITokenPair, ITokenPayload, UserWithoutPassword } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
     @InjectQueryService(UserEntity) private usersService: QueryService<UserEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword> {
    const [user] = await this.usersService.query({ filter: { email: { eq: email } }, paging: {limit: 1} });

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string): Promise<ITokenPair> {
    const user = await this.validateUser(email, password);
    return await this.generateTokenPair(user);
  }

  async generateTokenPair(user: UserWithoutPassword): Promise<ITokenPair> {
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  private async generateAccessToken(
    user: UserWithoutPassword,
  ): Promise<string> {
    const payload: ITokenPayload = {
      username: user.email,
      sub: user.id,
      type: 'access',
    };

    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    });
  }

  private async generateRefreshToken(
    user: UserWithoutPassword
  ): Promise<string> {
    const tokenId = randomUUID();

    const payload: ITokenPayload = {
      username: user.email,
      sub: user.id,
      jti: tokenId,
      type: 'refresh',
    };

    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES'),
    });
  }

  async refreshTokens(oldRefreshToken: string): Promise<ITokenPair> {
    const { sub } = await this.validateRefreshToken(oldRefreshToken);
    const user = await this.usersService.findById(sub);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.generateTokenPair(user);
  }

  async renewAccessToken(currentAccessToken: string): Promise<ITokenPair> {
    try {
      const payload = await this.jwtService.verifyAsync<ITokenPayload>(currentAccessToken, {
        secret: this.config.get('JWT_SECRET'),
        ignoreExpiration: false,
      });

      if (payload.type !== 'access') {
        throw new UnauthorizedException('Invalid token type for renewal');
      }

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      return this.generateTokenPair(user);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has already expired');
      }
      throw new UnauthorizedException('Invalid token for renewal');
    }
  }

  private async validateRefreshToken(token: string): Promise<ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync<ITokenPayload>(token, {
        secret: this.config.get('JWT_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async currentUser(authUser: IUserPayloadResponse): Promise<UserWithoutPassword> {
    try {
      const user = await this.usersService.findById(authUser.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { password, ...rest } = user as UserEntity & { password?: string };
      return rest;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
