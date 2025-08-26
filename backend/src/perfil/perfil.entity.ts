import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Perfil {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  permissions?: string[];

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.perfil)
  users: User[];
}
