import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from './categories/category.entity';
import { Brand } from './brands/brand.entity';
import { ProductVariants } from './variants/product-variants.entity';

@ObjectType()
@Entity('products')
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'brand_id', nullable: true })
  brandId: number;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Field(() => [ProductVariants])
  @OneToMany(() => ProductVariants, (variant) => variant.product)
  variants: ProductVariants[];

  @Field()
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
