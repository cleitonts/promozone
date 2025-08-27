import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VariantsService } from './variants.service';
import { VariantsResolver } from './variants.resolver';
import { ProductVariants } from './product-variants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariants])],

  providers: [VariantsService, VariantsResolver],
  exports: [VariantsService, TypeOrmModule],
})
export class VariantsModule {}