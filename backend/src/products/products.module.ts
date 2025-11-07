import { Module } from '@nestjs/common';
import { CategoryModule } from './categories/category.module';
import { BrandModule } from './brands/brand.module';
import { ProductModule } from './products/product.module';
import { ProductVariantModule } from './variants/product-variant.module';
import { AttributeModule } from './attributes/attribute.module';
import { AttributeValueModule } from './attributes/attribute-value.module';
import { ProductVariantAttributeModule } from './variants/product-variant-attribute.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brands/brand.entity';
import { CategoryEntity } from './categories/category.entity';
import { AttributeEntity } from './attributes/attribute.entity';
import { AttributeValueEntity } from './attributes/attribute-value.entity';
import { ProductEntity } from './products/product.entity';
import { ProductVariantEntity } from './variants/product-variant.entity';
import { ProductVariantAttributeEntity } from './variants/product-variant-attribute.entity';
import { ProductsSeedService } from './seed/products.seed';
import { SEEDER } from '@/seed/seed.token';

@Module({
  imports: [
    CategoryModule,
    BrandModule,
    ProductModule,
    ProductVariantModule,
    AttributeModule,
    AttributeValueModule,
    ProductVariantAttributeModule,
    TypeOrmModule.forFeature([
      BrandEntity,
      CategoryEntity,
      AttributeEntity,
      AttributeValueEntity,
      ProductEntity,
      ProductVariantEntity,
      ProductVariantAttributeEntity,
    ]),
  ],
  providers: [
    ProductsSeedService,
    { provide: SEEDER, useExisting: ProductsSeedService },
  ],
})
export class ProductsModule {}