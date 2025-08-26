import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantsController } from './variants.controller';
import { VariantsService } from './variants.service';
import { ProductVariants } from './product-variants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariants])],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService, TypeOrmModule],
})
export class VariantsModule {}