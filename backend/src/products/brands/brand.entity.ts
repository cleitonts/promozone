import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from '../product.entity';
import { BaseEntity } from 'src/common/base.entity';

@ObjectType()
@Entity('brands')
export class Brand extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  slug: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true })
  logo_url?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @Field(() => [Product], { nullable: true })
  @ManyToMany(() => Product, (product) => product.brands)
  @JoinTable({
    name: 'product_brands',
    joinColumn: { name: 'brand_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
  })
  productBrands?: Product[];
}
