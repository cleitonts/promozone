import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { SignInModel } from './signin.model';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserModel } from 'src/users/queries/validate-user.model';
import { SigninResponse } from '../DTO/signin.response';

@CommandHandler(SignInModel)
export class SignInHandler implements ICommandHandler<SignInModel> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: SignInModel): Promise<SigninResponse> {
    const user = await this.queryBus.execute(
      new ValidateUserModel(command.username, command.password),
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return new SigninResponse(this.jwtService.sign(payload));
  }
}
