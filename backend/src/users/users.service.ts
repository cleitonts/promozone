import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserRequest } from './dto/create-user.request';
import { ConfigService } from '@nestjs/config';
import { EUserRole } from './user-role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequest } from './dto/update-user.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'roles', 'createdAt'], // Não inclui password
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserRequest.password) {
      updateUserRequest.password = await this.hashPassword(
        updateUserRequest.password,
      );
    }

    return this.usersRepository.save({
      ...user,
      ...updateUserRequest,
    });
  }

  async create(createUserRequest: CreateUserRequest): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserRequest.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const uniqueRoles = [...new Set(createUserRequest.roles)];

    const user = this.usersRepository.create({
      ...createUserRequest,
      password: await this.hashPassword(createUserRequest.password),
      roles: uniqueRoles,
    });

    return this.usersRepository.save(user);
  }

  async createAdmin(email?: string, password?: string): Promise<void> {
    try {
      const adminEmail = email ?? this.configService.get<string>('ADMIN_EMAIL');
      const adminPassword =
        password ?? this.configService.get<string>('ADMIN_PASSWORD');

      if (!adminEmail || !adminPassword) {
        throw new Error('Credentials not defined');
      }

      await this.create({
        email: adminEmail,
        password: adminPassword,
        roles: [EUserRole.ADMIN],
      });
    } catch (error) {
      throw new Error('Error seeding admin user: ' + error.message);
    }
  }

  listRoles(user: User) {
    console.log('listRoles', user);
    return Object.values(EUserRole);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
