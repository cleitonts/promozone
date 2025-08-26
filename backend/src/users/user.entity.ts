import { Post } from 'src/posts/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Perfil } from 'src/perfil/perfil.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  // Password field is intentionally not exposed in GraphQL for security
  @Column()
  password: string;

  @Field(() => Perfil, { nullable: true })
  @ManyToOne(() => Perfil, (perfil) => perfil.users)
  perfil: Perfil;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
