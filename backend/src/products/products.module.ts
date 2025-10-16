import { Module } from '@nestjs/common';
import { CategoryModule } from './categories/category.module';
import { BrandModule } from './brands/brand.module';
import { ProductModule } from './products/product.module';
import { ProductVariantModule } from './variants/product-variant.module';
import { AttributeModule } from './attributes/attribute.module';
import { AttributeValueModule } from './attributes/attribute-value.module';

@Module({
  imports: [
    CategoryModule,
    BrandModule,
    ProductModule,
    ProductVariantModule,
    AttributeModule,
    AttributeValueModule,
  ],
})
export class ProductsModule {}