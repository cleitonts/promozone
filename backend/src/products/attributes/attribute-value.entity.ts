import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Attribute } from './attribute.entity';
import { BaseEntity } from 'src/common/base.entity';

@ObjectType()
@Entity('attribute_values')
export class AttributeValue extends BaseEntity {

  @Field(() => Int)
  @Column({ name: 'attribute_id' })
  attributeId: number;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  value: string;

  @Field(() => Attribute)
  @ManyToOne(() => Attribute, (attribute) => attribute.attributeValues, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;
}