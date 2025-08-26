import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from './perfil.entity';
import { PerfilService } from './perfil.service';

import { PerfilResolver } from './perfil.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Perfil])],
  providers: [PerfilService, PerfilResolver],

  exports: [PerfilService],
})
export class PerfilModule {}
