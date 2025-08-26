import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttributeValue } from './attribute-value.entity';

@ObjectType()
@Entity('attributes')
export class Attribute {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Field(() => [AttributeValue])
  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  attributeValues: AttributeValue[];
}