import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authorization/guards/jwt-auth.guard';
import { PerfilService } from './perfil.service';
import { Perfil } from './perfil.entity';
import { CreateRequest } from './dto/create.request';
import { UpdateRequest } from './dto/update.request';


@Resolver(() => Perfil)
@UseGuards(JwtAuthGuard)
export class PerfilResolver {
  constructor(private readonly perfilService: PerfilService) {}

  @Mutation(() => Perfil)
  async createPerfil(
    @Args('createPerfilInput') createPerfilInput: CreateRequest,
  ): Promise<Perfil> {
    return await this.perfilService.create(createPerfilInput);
  }

  @Query(() => [Perfil])
  async findAllPerfis(): Promise<Perfil[]> {
    return await this.perfilService.findAll();
  }

  @Query(() => [String])
  async getPerfilPermissions(): Promise<string[]> {
    return [];
  }

  @Query(() => Perfil)
  async findOnePerfil(@Args('id') id: string): Promise<Perfil> {
    const perfil = await this.perfilService.findOneBy({ id });
    if (!perfil) {
      throw new NotFoundException('Perfil not found');
    }
    return perfil;
  }

  @Mutation(() => Perfil)
  async updatePerfil(
    @Args('id') id: string,
    @Args('updatePerfilInput') updatePerfilInput: UpdateRequest,
  ): Promise<Perfil> {
    const perfil = await this.perfilService.findOneBy({ id });
    if (!perfil) {
      throw new NotFoundException('Perfil not found');
    }
    return this.perfilService.update(id, updatePerfilInput);
  }

  @Mutation(() => Boolean)
  async removePerfil(@Args('id') id: string): Promise<boolean> {
    await this.perfilService.delete(id);
    return true;
  }
}