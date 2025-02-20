import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { Perfil } from './perfil.entity';
import { CreateRequest } from './dto/create.request';
import { UpdateRequest } from './dto/update.request';
import { PaginationRequest } from 'src/common/dto/api.request';
import { PaginationResponse } from 'src/common/dto/api.response';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private readonly perfilRepository: Repository<Perfil>,
  ) {}

  async create(createPerfilRequest: CreateRequest): Promise<Perfil> {
    if (createPerfilRequest.name.toLowerCase() === 'admin') {
      throw new NotAcceptableException('Invalid perfil name');
    }
    const perfil = this.perfilRepository.create(createPerfilRequest);
    return await this.perfilRepository.save(perfil);
  }

  async findAll(get: PaginationRequest): Promise<PaginationResponse<Perfil>> {
    return await this.perfilRepository.findAndCount({
      take: get.limit,
      skip: (get.page - 1) * get.limit,
    });
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
    const updatePerfil = await this.perfilRepository.findOne({
      where: { id },
    });

    if (
      updateRequest.name.toLowerCase() === 'admin' ||
      updatePerfil?.name.toLowerCase() === 'admin'
    ) {
      throw new NotAcceptableException('Invalid perfil name');
    }

    return await this.perfilRepository.save({ id, ...updateRequest });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.perfilRepository.delete(id);
  }
}
