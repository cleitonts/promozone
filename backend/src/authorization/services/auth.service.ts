import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { User } from 'src/users/user.entity';
import { Perfil } from '../../perfil/perfil.entity';

type UserWithoutPassword = Pick<User, 'id' | 'email' | 'perfil' | 'posts' | 'createdAt'>;

export interface ITokenPayload {
  username: string;
  perfil: Perfil;
  sub: string;
  tenantId?: string;
  jti?: string;
  type: 'access' | 'refresh';
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string, tenantId?: string): Promise<ITokenPair> {
    const user = await this.validateUser(email, password);
    return await this.generateTokenPair(user, tenantId);
  }

  async generateTokenPair(user: UserWithoutPassword, tenantId?: string): Promise<ITokenPair> {
    return {
      accessToken: await this.generateAccessToken(user, tenantId),
      refreshToken: await this.generateRefreshToken(user, tenantId),
    };
  }

  private async generateAccessToken(
    user: UserWithoutPassword,
    tenantId?: string,
  ): Promise<string> {
    const payload: ITokenPayload = {
      username: user.email,
      perfil: user.perfil,
      sub: user.id,
      tenantId,
      type: 'access',
    };

    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    });
  }

  private async generateRefreshToken(
    user: UserWithoutPassword,
    tenantId?: string,
  ): Promise<string> {
    const tokenId = randomUUID();

    const payload: ITokenPayload = {
      username: user.email,
      perfil: user.perfil,
      sub: user.id,
      tenantId,
      jti: tokenId,
      type: 'refresh',
    };

    return this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES'),
    });
  }

  async refreshTokens(oldRefreshToken: string): Promise<ITokenPair> {
    const { sub, tenantId } = await this.validateRefreshToken(oldRefreshToken);
    const user = await this.usersService.findOne(sub);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.generateTokenPair(user, tenantId);
  }

  async renewAccessToken(currentAccessToken: string): Promise<ITokenPair> {
    try {
      // Validar rigorosamente o token atual
      const payload = await this.jwtService.verifyAsync<ITokenPayload>(currentAccessToken, {
        secret: this.config.get('JWT_SECRET'),
        ignoreExpiration: false, // Não ignorar expiração para validação rigorosa
      });

      // Verificar se é um token de acesso válido
      if (payload.type !== 'access') {
        throw new UnauthorizedException('Invalid token type for renewal');
      }

      // Buscar o usuário para garantir que ainda existe e está ativo
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Gerar novo par de tokens
      return this.generateTokenPair(user, payload.tenantId);
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
}
