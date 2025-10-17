import { ulid } from 'ulid'

export class UlidUtil {
  static generate(): string {
    return ulid()
  }

  static generateWithTimestamp(timestamp: number): string {
    return ulid(timestamp)
  }

  static isValid(id: string): boolean {
    const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/
    return ulidRegex.test(id)
  }

  static getTimestamp(id: string): number {
    if (!this.isValid(id)) {
      throw new Error('Invalid ULID format')
    }
    const timestampPart = id.substring(0, 10)
    const base32Chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
    let timestamp = 0
    for (let i = 0; i < timestampPart.length; i++) {
      const char = timestampPart[i]
      const value = base32Chars.indexOf(char)
      timestamp = timestamp * 32 + value
    }
    return timestamp
  }
}