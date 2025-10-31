import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '@/common/base.entity';
import { UserEntity } from '@/user/user.entity';
import { ProfileEntity } from '@/profile/profile.entity';

@Entity({ name: 'tenants', schema: 'users' })
export class TenantEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'char', length: 26 })
  ownerId!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner!: UserEntity;

  @OneToMany(() => ProfileEntity, (profile) => profile.tenant, { cascade: false })
  profiles!: ProfileEntity[];

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}