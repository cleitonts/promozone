import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { RegisterModel } from './register.model';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(RegisterModel)
export class RegisterHandler implements ICommandHandler<RegisterModel> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: RegisterModel): Promise<string> {
    let user = await this.userRepository.findOne({
      where: { email: command.email },
    });

    if (user) {
      throw new ConflictException('Username already exists');
    }
    if (command.password_repeat !== command.password) {
      throw new BadRequestException('Passwords does not match');
    }

    user = new User(crypto.randomUUID(), {
      email: command.email,
      password: command.password,
      name: command.name,
    });
    return (await this.userRepository.save(user)).id;
  }
}
