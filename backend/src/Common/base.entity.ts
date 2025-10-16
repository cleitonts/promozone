import { PrimaryColumn, ValueTransformer } from 'typeorm'
import { UlidUtil } from './ulid.util'

const ulidTransformer: ValueTransformer = {
  to: (value?: string) => {
    if (value && UlidUtil.isValid(value)) {
      return value
    }
    return UlidUtil.generate()
  },
  from: (value: string) => value,
}

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'char', length: 26, transformer: ulidTransformer })
  id!: string
}
