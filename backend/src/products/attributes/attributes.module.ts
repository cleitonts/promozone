import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesService } from './attributes.service';
import { AttributeValuesService } from './attribute-values.service';
import { ProductVariantAttributesService } from './product-variant-attributes.service';
import { AttributesResolver } from './attributes.resolver';
import { AttributeValuesResolver } from './attribute-values.resolver';
import { ProductVariantAttributesResolver } from './product-variant-attributes.resolver';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';
import { ProductVariantAttribute } from './product-variant-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue, ProductVariantAttribute])],

  providers: [
    AttributesService, 
    AttributeValuesService, 
    ProductVariantAttributesService,
    AttributesResolver, 
    AttributeValuesResolver,
    ProductVariantAttributesResolver
  ],
  exports: [AttributesService, AttributeValuesService, ProductVariantAttributesService, TypeOrmModule],
})
export class AttributesModule {}