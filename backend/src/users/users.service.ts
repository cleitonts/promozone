import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserRequest } from './dto/create-user.request';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequest } from './dto/update-user.request';
import { PerfilService } from 'src/perfil/perfil.service';
import { PaginationResponse } from 'src/common/dto/api.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
    private perfilService: PerfilService,
  ) {}

  async findAll(): Promise<PaginationResponse<User>> {
    return await this.usersRepository.findAndCount({
      select: ['id', 'email', 'perfil', 'createdAt'],
      take: 10,
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['perfil'],
    });
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

    let perfil = await this.perfilService.findOneBy({
      id: createUserRequest.perfilId,
    });
    if (!perfil) {
      throw new ConflictException('Perfil not found');
    }

    const user = this.usersRepository.create({
      ...createUserRequest,
      password: await this.hashPassword(createUserRequest.password),
      perfil,
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

      let perfil = await this.perfilService.findOneBy({ name: 'admin' });
      if (!perfil) {
        perfil = await this.perfilService.create({
          name: 'admin',
        });
      }

      await this.create({
        email: adminEmail,
        password: adminPassword,
        perfilId: perfil.id,
      });
    } catch (error) {
      throw new Error('Error seeding admin user: ' + error.message);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
