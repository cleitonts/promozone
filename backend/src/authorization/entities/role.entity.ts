import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/user.entity';

@ObjectType()
@Entity('roles')
export class Role extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ default: false })
  isGlobal: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: User;

  @OneToMany('RolePermission', 'role')
  rolePermissions: any[];

  @OneToMany('UserRole', 'role')
  userRoles: any[];
}