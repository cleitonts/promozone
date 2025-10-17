import { Column, Entity } from 'typeorm';
import { Name } from '@/common/entity/name.entity';
import { CreatedAt } from '@/common/entity/createdAt.entity';
import { BaseEntity } from '@/common/base.entity';

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
}