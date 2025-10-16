import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/Common/base.entity';
import { AttributeEntity } from './attribute.entity';

@Entity({ name: 'attribute_values', schema: 'products' })
export class AttributeValueEntity extends BaseEntity {
  @Column()
  attributeId!: string;

  @Column()
  value!: string;

  @Column({ default: true })
  active!: boolean;

  @ManyToOne(() => AttributeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attributeId' })
  attribute!: AttributeEntity;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}