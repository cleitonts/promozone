import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/user.entity';
import { Role } from './role.entity';
import { UserRole } from './user-role.entity';

@ObjectType()
@Entity('tenants')
export class Tenant extends BaseEntity {
  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  description?: string;

  @Field()
  @Column({ length: 50, unique: true })
  slug: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  domain?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  settings?: string;

  // Proprietário do tenant
  @Field(() => User)
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  // Roles específicas do tenant
  @OneToMany(() => Role, (role) => role.tenant)
  roles: Role[];

  // Usuários do tenant
  @OneToMany(() => UserRole, (userRole) => userRole.tenant)
  userRoles: UserRole[];

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}