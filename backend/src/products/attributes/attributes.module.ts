import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesService } from './attributes.service';
import { AttributeValuesService } from './attribute-values.service';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';
import { ProductVariantAttribute } from './product-variant-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue, ProductVariantAttribute])],

  providers: [AttributesService, AttributeValuesService],
  exports: [AttributesService, AttributeValuesService, TypeOrmModule],
})
export class AttributesModule {}