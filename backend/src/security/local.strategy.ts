import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserResponse } from 'src/users/DTO/user.response';
import { ValidateUserModel } from 'src/users/queries/validate-user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<UserResponse> {
    const user = await this.queryBus.execute<ValidateUserModel, UserResponse>(
      new ValidateUserModel({ email: username, password }),
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
