import { PrimaryColumn, BeforeInsert, BaseEntity as BaseEntityORM } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UlidUtil } from './ulid.util';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity extends BaseEntityORM {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  protected generateId(): void {
    if (!this.id) {
      this.id = UlidUtil.generate();
    }
  }

  public setCustomId(customId: string): void {
    if (UlidUtil.isValid(customId)) {
      this.id = customId;
    } else {
      throw new Error('Given ID is not a valid ULID');
    }
  }

  public getCreationTimestamp(): number {
    if (!this.id) {
      throw new Error('ID not generated yet');
    }
    return UlidUtil.getTimestamp(this.id);
  }

  public hasValidId(): boolean {
    return this.id ? UlidUtil.isValid(this.id) : false;
  }
}