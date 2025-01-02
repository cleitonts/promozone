import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponse } from '../DTO/user.response';
import { User } from '../entities/user.entity';
import { ValidateUserModel } from './validate-user.model';

@QueryHandler(ValidateUserModel)
export class ValidateUserHandler implements IQueryHandler<ValidateUserModel> {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async execute(query: ValidateUserModel): Promise<UserResponse | null> {
    const user = await this.repository.findOneOrFail({
      where: { username: query.username },
    });
    if (user && user.password === query.password) {
      return UserResponse.createFromEntity(user);
    }
    return null;
  }
}
