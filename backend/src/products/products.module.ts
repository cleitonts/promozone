import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Brand } from './brands/brand.entity';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { BrandsService } from './brands/brands.service';
import { CategoriesModule } from './categories/categories.module';
import { VariantsModule } from './variants/variants.module';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand]),
    CategoriesModule,
    VariantsModule,
    AttributesModule,
  ],

  providers: [ProductsService, ProductsResolver, BrandsService],
  exports: [TypeOrmModule, ProductsService, BrandsService],
})
export class ProductsModule {}
