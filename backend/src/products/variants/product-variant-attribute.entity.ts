import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '@/common/base.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { AttributeValueEntity } from '../attributes/attribute-value.entity';

@Entity({ name: 'product_variant_attributes', schema: 'products' })
export class ProductVariantAttributeEntity extends BaseEntity {
  @Column({ type: 'char', length: 26 })
  variantId!: string;

  @Column({ type: 'char', length: 26 })
  attributeValueId!: string;

  @ManyToOne(() => ProductVariantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variantId' })
  variant!: ProductVariantEntity;

  @ManyToOne(() => AttributeValueEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attributeValueId' })
  attributeValue!: AttributeValueEntity;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}