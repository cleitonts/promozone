import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { SignInModel } from './signin.model';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindOneModel } from 'src/users/queries/find-one.model';

@CommandHandler(SignInModel)
export class SignInHandler implements ICommandHandler<SignInModel> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: SignInModel): Promise<any> {
    const user = await this.queryBus.execute(
      new FindOneModel(command.username),
    );

    if (user?.password !== command.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
