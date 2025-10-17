import { BeforeInsert, PrimaryColumn } from 'typeorm'
import { UlidUtil } from './ulid.util'

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'char', length: 26})
  id!: string

  @BeforeInsert()
  ensureId(): void {
    if (!this.id || !UlidUtil.isValid(this.id)) {
      this.id = UlidUtil.generate()
    }
  }
}
