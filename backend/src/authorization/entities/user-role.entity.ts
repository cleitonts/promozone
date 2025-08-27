import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/user.entity';
import { Role } from './role.entity';

@ObjectType()
@Entity('user_roles')
export class UserRole extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Field({ nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: User;
}