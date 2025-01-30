import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users.service';
@Injectable()
export class AdminSeeder implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.usersService.createAdmin();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.warn('Admin account setted');
    }
  }
}
