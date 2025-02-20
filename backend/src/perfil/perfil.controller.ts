import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { PerfilService } from './perfil.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiRequest } from 'src/common/types/request';
import { UpdateRequest } from './dto/update.request';
import { CreateRequest } from './dto/create.request';
import { PerfilPermissions } from './perfil-permissions';
import { Perfil } from './perfil.entity';
import { PaginationResponse } from 'src/common/dto/api.response';
import { PaginationRequest } from 'src/common/dto/api.request';

@Controller({
  version: '1',
  path: 'perfil',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  @Roles('PERFIL:CREATE')
  async create(@Body() createPerfilRequest: CreateRequest) {
    return await this.perfilService.create(createPerfilRequest);
  }

  @Get()
  @Roles('PERFIL:READ')
  async list(
    @Query() query: PaginationRequest,
  ): Promise<PaginationResponse<Perfil>> {
    return await this.perfilService.findAll(query);
  }

  @Get('/permissions')
  @Roles('PERFIL:READ')
  async listPermissions() {
    return PerfilPermissions;
  }

  @Get(':id')
  @Roles('PERFIL:READ')
  async find(@Param('id') id: string) {
    const perfil = await this.perfilService.findOneBy({ id });
    if (!perfil) {
      throw new NotFoundException('Perfil not found');
    }
    return perfil;
  }

  @Put(':id')
  @Roles('PERFIL:UPDATE')
  async update(
    @Param('id') id: string,
    @Body() updateRequest: UpdateRequest,
    @Req() req: ApiRequest,
  ) {
    const perfil = await this.perfilService.findOneBy({ id });
    if (!perfil) {
      throw new NotFoundException('Perfil not found');
    }

    return this.perfilService.update(id, updateRequest);
  }

  @Delete(':id')
  @Roles('PERFIL:DELETE')
  async remove(@Param('id') id: string) {
    return this.perfilService.delete(id);
  }
}
