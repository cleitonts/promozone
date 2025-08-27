import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { Brand } from './brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandsService, BrandsResolver],
  exports: [BrandsService, TypeOrmModule],
})
export class BrandsModule {}