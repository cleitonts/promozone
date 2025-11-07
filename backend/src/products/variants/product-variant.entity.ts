import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/base.entity';
import { ProductEntity } from '../products/product.entity';

@Entity({ name: 'product_variants', schema: 'products' })
export class ProductVariantEntity extends BaseEntity{
  @Column({ type: 'char', length: 26 })
  productId!: string;

  @Column({ unique: true })
  sku!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'integer', default: 0 })
  stock!: number;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ default: true })
  active!: boolean;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: ProductEntity;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}