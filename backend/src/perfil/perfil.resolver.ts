import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PerfilService } from './perfil.service';
import { Perfil } from './perfil.entity';
import { CreateRequest } from './dto/create.request';
import { UpdateRequest } from './dto/update.request';
import { PerfilPermissions } from './perfil-permissions';


@Resolver(() => Perfil)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PerfilResolver {
  constructor(private readonly perfilService: PerfilService) {}

  @Mutation(() => Perfil)
  @Roles('PERFIL:CREATE')
  async createPerfil(
    @Args('createPerfilInput') createPerfilInput: CreateRequest,
  ): Promise<Perfil> {
    return await this.perfilService.create(createPerfilInput);
  }

  @Query(() => [Perfil])
  @Roles('PERFIL:READ')
  async findAllPerfis(): Promise<Perfil[]> {
    return await this.perfilService.findAll();
  }

  @Query(() => [String])
  @Roles('PERFIL:READ')
  async getPerfilPermissions(): Promise<string[]> {
    return Object.values(PerfilPermissions).flat();
  }

  @Query(() => Perfil)
  @Roles('PERFIL:READ')
  async findOnePerfil(@Args('id') id: string): Promise<Perfil> {
    const perfil = await this.perfilService.findOneBy({ id });
    if (!perfil) {
      throw new NotFoundException('Perfil not found');
    }
    return perfil;
  }

  @Mutation(() => Perfil)
  @Roles('PERFIL:UPDATE')
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
  @Roles('PERFIL:DELETE')
  async removePerfil(@Args('id') id: string): Promise<boolean> {
    await this.perfilService.delete(id);
    return true;
  }
}