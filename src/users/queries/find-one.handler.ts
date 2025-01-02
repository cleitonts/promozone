import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneModel } from './find-one.model';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from '../DTO/user.response';

@QueryHandler(FindOneModel)
export class findOneHandler
  implements IQueryHandler<FindOneModel, UserResponse>
{
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async execute(query: FindOneModel): Promise<UserResponse> {
    const user = await this.repository.findOneOrFail({
      where: { email: query.email },
    });
    return UserResponse.createFromEntity(user);
  }
}
