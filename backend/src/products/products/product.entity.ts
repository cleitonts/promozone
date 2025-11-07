import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/base.entity';
import { CategoryEntity } from '../categories/category.entity';
import { BrandEntity } from '../brands/brand.entity';

@Entity({ name: 'products', schema: 'products' })
export class ProductEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'char', length: 26, nullable: true })
  categoryId!: string;

  @Column({ type: 'char', length: 26, nullable: true })
  brandId!: string;

  @Column({ default: true })
  active!: boolean;

  @ManyToOne(() => CategoryEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category!: CategoryEntity;

  @ManyToOne(() => BrandEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brandId' })
  brand!: BrandEntity;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}