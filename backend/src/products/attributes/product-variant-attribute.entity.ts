import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductVariants } from '../variants/product-variants.entity';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';
import { BaseEntity } from 'src/common/base.entity';

@ObjectType()
@Entity('product_variant_attributes')
@Unique(['variantId', 'attributeId'])
export class ProductVariantAttribute extends BaseEntity {
  @Field(() => Int)
  @Column({ name: 'variant_id' })
  variantId: number;

  @Field(() => Int)
  @Column({ name: 'attribute_id' })
  attributeId: number;

  @Field(() => Int)
  @Column({ name: 'value_id' })
  valueId: number;

  @Field(() => ProductVariants)
  @ManyToOne(() => ProductVariants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariants;

  @Field(() => Attribute)
  @ManyToOne(() => Attribute, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Field(() => AttributeValue)
  @ManyToOne(() => AttributeValue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'value_id' })
  value: AttributeValue;
}