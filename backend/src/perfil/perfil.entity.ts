import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  permissions?: string[];

  @OneToMany(() => User, (user) => user.perfil)
  users: User[];
}
