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

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  originalUrl: string;

  @Column()
  currentPrice: number;

  @Column()
  originalPrice: number;

  @Column()
  discountPercentage: number;

  @Column({ type: 'int', default: 0 })
  upvotes: number;

  @Column({ type: 'int', default: 0 })
  downvotes: number;

  @CreateDateColumn()
  createdAt: Date;

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
