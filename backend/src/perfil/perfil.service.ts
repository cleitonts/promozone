import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Perfil } from './perfil.entity';
import { CreateRequest } from './dto/create.request';
import { UpdateRequest } from './dto/update.request';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
  ) {}

  async create(createPerfilRequest: CreateRequest): Promise<Perfil> {
    const perfil = this.perfilRepository.create(createPerfilRequest);
    return await this.perfilRepository.save(perfil);
  }

  async findAll(): Promise<Perfil[]> {
    return await this.perfilRepository.find();
  }

  async findBy(
    props: Partial<FindOptionsWhere<Perfil>>,
  ): Promise<Perfil[] | null> {
    return await this.perfilRepository.findBy(props);
  }

  async findOneBy(
    props: Partial<FindOptionsWhere<Perfil>>,
  ): Promise<Perfil | null> {
    return await this.perfilRepository.findOneBy(props);
  }

  async findByPermission(modulo: string, operation: string): Promise<Perfil[]> {
    return this.perfilRepository
      .createQueryBuilder('perfil')
      .where(`perfil.permissions -> :modulo ? :operation`, {
        modulo,
        operation,
      })
      .getMany();
  }

  async update(id: string, updateRequest: UpdateRequest): Promise<Perfil> {
    await this.perfilRepository.update(id, updateRequest);
    const updatedPost = await this.perfilRepository.findOne({
      where: { id },
    });

    if (!updatedPost) {
      throw new NotFoundException('Perfil not found');
    }

    return updatedPost;
  }
}
