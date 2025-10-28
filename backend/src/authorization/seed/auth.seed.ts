import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import * as bcrypt from 'bcrypt';
import { UlidUtil } from '@/common/ulid.util';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    const count = await this.userRepository.count();
    if (count === 0) {
      const admin = this.userRepository.create({
        id: UlidUtil.generate(),
        name: { first: 'Admin', last: 'User' },
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin', 10),
        active: true,
        roles: ['admin'],
      });

      const user = this.userRepository.create({
        id: UlidUtil.generate(),
        name: { first: 'User', last: 'Test' },
        email: 'user@user.com',
        password: await bcrypt.hash('admin', 10),
        active: true,
        roles: [],
      });

      await this.userRepository.save([admin, user]);
      console.log('Seed data inserted successfully');
    } else {
      console.log('Database already contains data, ignoring seed');
    }
  }
}
