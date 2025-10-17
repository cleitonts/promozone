import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/base.entity';

@Entity({ name: 'tenants', schema: 'users' })
export class TenantEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  domain!: string;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}