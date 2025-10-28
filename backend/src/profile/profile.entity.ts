import { Column, CreateDateColumn, Entity, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from '@/common/base.entity';
import { TenantEntity } from '@/tenant/tenant.entity';
import { UserEntity } from '@/user/user.entity';

@Entity({ name: 'profiles', schema: 'users' })
export class ProfileEntity extends BaseEntity {
  @Column({ type: 'char', length: 26 })
  tenantId!: string;

  @Column({ type: 'jsonb', default: [] })
  resolvers!: string[];

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant!: TenantEntity;

  @ManyToMany(() => UserEntity, (user) => user.profiles)
  users!: UserEntity[];

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}