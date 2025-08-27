import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttributeValue } from './attribute-value.entity';
import { BaseEntity } from 'src/common/base.entity';

@ObjectType()
@Entity('attributes')
export class Attribute extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Field(() => [AttributeValue])
  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  attributeValues: AttributeValue[];
}