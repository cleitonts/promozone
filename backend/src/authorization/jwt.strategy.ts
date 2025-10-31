import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config';
import { ITokenPayload, IUserPayloadResponse } from './auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ProfileEntity } from '@/profile/profile.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not defined in environment.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: ITokenPayload): Promise<IUserPayloadResponse> {
    const user = await this.userRepo.findOne({ where: { id: payload.sub }, relations: ['profiles'] });
    const activeTenantId = user?.activeTenantId ?? null;
    let tenantPermissions: string[] = [];
    if (activeTenantId && user) {
      tenantPermissions = (user.profiles ?? [])
        .filter((p) => p.tenantId === activeTenantId)
        .flatMap((p) => p.resolvers);
    }
    return {
      userId: payload.sub,
      username: payload.username,
      activeTenantId,
      tenantPermissions,
    };
  }
}