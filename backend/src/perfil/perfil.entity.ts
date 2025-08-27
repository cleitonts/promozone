import { User } from 'src/users/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';

@ObjectType()
@Entity()
export class Perfil extends BaseEntity {

  @Field()
  @Column({ unique: true })
  name: string;



  @Field(() => [User])
  @OneToMany(() => User, (user) => user.perfil)
  users: User[];
}
