import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Product } from '../product.entity';

@ObjectType()
@Entity('products_variants')
export class ProductVariants {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'product_id' })
  productId: number;

  @Field()
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  sku: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Field(() => Int)
  @Column({ type: 'integer', nullable: false, default: 0 })
  stock: number;

  @Field({ nullable: true })
  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Field()
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
