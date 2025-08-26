import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { AttributeValuesController } from './attribute-values.controller';
import { AttributeValuesService } from './attribute-values.service';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';
import { ProductVariantAttribute } from './product-variant-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue, ProductVariantAttribute])],
  controllers: [AttributesController, AttributeValuesController],
  providers: [AttributesService, AttributeValuesService],
  exports: [AttributesService, AttributeValuesService, TypeOrmModule],
})
export class AttributesModule {}