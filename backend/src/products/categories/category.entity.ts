import {
  Entity,
  Column,
  OneToMany
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from '../products/product.entity';
import { BaseEntity } from 'src/common/base.entity';

@ObjectType()
@Entity('categories')
export class Category extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
