import { Column, Entity } from 'typeorm';
import { Name } from 'src/Common/entity/name.entity';
import { CreatedAt } from 'src/Common/entity/createdAt.entity';
import { BaseEntity } from 'src/Common/base.entity';

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