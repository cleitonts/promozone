import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneModel } from './find-one.model';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(FindOneModel)
export class findOneHandler implements IQueryHandler<FindOneModel> {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async execute(query: FindOneModel): Promise<User> {
    return this.repository.findOneOrFail({
      where: { username: query.username },
    });
  }
}
