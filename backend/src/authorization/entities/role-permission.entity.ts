import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';
import { Permission } from './permission.entity';

@ObjectType()
@Entity('role_permissions')
export class RolePermission extends BaseEntity {
  @Field(() => String)
  @ManyToOne('Role', 'rolePermissions', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: any;

  @Field(() => Permission)
  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}