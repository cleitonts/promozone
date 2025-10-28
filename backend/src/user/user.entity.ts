import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Name } from '@/common/entity/name.entity';
import { CreatedAt } from '@/common/entity/createdAt.entity';
import { BaseEntity } from '@/common/base.entity';
import { ProfileEntity } from '@/profile/profile.entity';

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

  @Column(() => CreatedAt)
  createdAt!: CreatedAt

  // Roles as JSON array, decoupled from current permissions system
  @Column({ type: 'jsonb', default: [] })
  roles!: string[]

  @ManyToMany(() => ProfileEntity, (profile) => profile.users)
  @JoinTable({
    name: 'user_profiles',
    schema: 'users',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profileId', referencedColumnName: 'id' },
  })
  profiles!: ProfileEntity[]
}