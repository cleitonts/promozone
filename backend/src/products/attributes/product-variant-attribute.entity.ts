import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ProductVariants } from '../variants/product-variants.entity';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';

@Entity('product_variant_attributes')
@Unique(['variantId', 'attributeId'])
export class ProductVariantAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'variant_id' })
  variantId: number;

  @Column({ name: 'attribute_id' })
  attributeId: number;

  @Column({ name: 'value_id' })
  valueId: number;

  @ManyToOne(() => ProductVariants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariants;

  @ManyToOne(() => Attribute, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @ManyToOne(() => AttributeValue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'value_id' })
  value: AttributeValue;
}