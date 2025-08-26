import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import sanitizeHtml from 'sanitize-html';
import { User } from 'src/users/user.entity';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column()
  originalUrl: string;

  @Field(() => Float)
  @Column()
  currentPrice: number;

  @Field(() => Float)
  @Column()
  originalPrice: number;

  @Field(() => Float)
  @Column()
  discountPercentage: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  upvotes: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  downvotes: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  // Sanitização automática
  @BeforeInsert()
  @BeforeUpdate()
  sanitizeContent() {
    this.content = sanitizeHtml(this.content, {
      allowedTags: ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li'],
      allowedAttributes: {
        a: ['href'],
      },
    });
  }

  // Método para cálculo do engajamento
  getEngagementPercentage(): number {
    const total = this.upvotes + this.downvotes;
    return total > 0 ? Math.round((this.upvotes / total) * 100) : 0;
  }
}
