import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from 'src/Common/base.entity';

@Entity({ name: 'brands', schema: 'products' })
export class BrandEntity extends BaseEntity {

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  logoUrl!: string;

  @Column({ nullable: true })
  website!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}