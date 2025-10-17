import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/base.entity';

@Entity({ name: 'todo_items' })
export class TodoItemEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  completed!: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}