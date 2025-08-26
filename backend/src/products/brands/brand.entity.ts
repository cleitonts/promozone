import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../product.entity';

@ObjectType()
@Entity('brands')
export class Brand {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
