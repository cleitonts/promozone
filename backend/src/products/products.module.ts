import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { VariantsModule } from './variants/variants.module';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BrandsModule,
    CategoriesModule,
    VariantsModule,
    AttributesModule,
  ],

  providers: [ProductsService, ProductsResolver],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
