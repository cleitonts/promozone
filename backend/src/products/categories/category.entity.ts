import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/base.entity';

@Entity({ name: 'categories', schema: 'products' })
export class CategoryEntity extends BaseEntity {

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}