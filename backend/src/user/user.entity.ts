import { Column, Entity, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Name } from '@/common/entity/name.entity';
import { BaseEntity } from '@/common/base.entity';
import { ProfileEntity } from '@/profile/profile.entity';
import { TenantEntity } from '@/tenant/tenant.entity';

@Entity({ name: 'users', schema: 'users' })
export class UserEntity extends BaseEntity {
  @Column(() => Name)
  name!: Name

  @Column({ unique: true })
  email!: string

  @Column({ nullable: false })
  password!: string

  @Column({ default: true })
  active!: boolean

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  // Roles as JSON array, decoupled from current permissions system
  @Column({ type: 'jsonb', default: [] })
  roles!: string[]

  @Column({ type: 'char', length: 26, nullable: true })
  activeTenantId!: string | null

  @ManyToOne(() => TenantEntity, { nullable: true })
  @JoinColumn({ name: 'activeTenantId' })
  activeTenant!: TenantEntity | null

  @ManyToMany(() => ProfileEntity, (profile) => profile.users)
  @JoinTable({
    name: 'user_profiles',
    schema: 'users',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profileId', referencedColumnName: 'id' },
  })
  profiles!: ProfileEntity[]
}