import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';
import { RolePermission } from './role-permission.entity';

@ObjectType()
@Entity('permissions')
export class Permission extends BaseEntity {
  @Field()
  @Column()
  resource: string;

  @Field()
  @Column()
  action: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  rolePermissions: RolePermission[];

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Computed field for GraphQL
  @Field()
  get name(): string {
    return `${this.resource}:${this.action}`;
  }
}