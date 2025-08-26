import { ulid } from 'ulid';

/**
 * Utility class for generating and validating ULIDs
 */
export class UlidUtil {
  /**
   * Generate a new ULID
   * @returns A new ULID string
   */
  static generate(): string {
    return ulid();
  }

  /**
   * Generate a ULID with a specific timestamp
   * @param timestamp - The timestamp to use (in milliseconds)
   * @returns A ULID string with the specified timestamp
   */
  static generateWithTimestamp(timestamp: number): string {
    return ulid(timestamp);
  }

  /**
   * Validate if a string is a valid ULID
   * @param id - The string to validate
   * @returns True if the string is a valid ULID, false otherwise
   */
  static isValid(id: string): boolean {
    // ULID format: 26 characters, base32 encoded
    const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;
    return ulidRegex.test(id);
  }

  /**
   * Extract timestamp from a ULID
   * @param id - The ULID string
   * @returns The timestamp in milliseconds
   */
  static getTimestamp(id: string): number {
    if (!this.isValid(id)) {
      throw new Error('Invalid ULID format');
    }
    
    // Extract the first 10 characters (timestamp part) and decode
    const timestampPart = id.substring(0, 10);
    const base32Chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    
    let timestamp = 0;
    for (let i = 0; i < timestampPart.length; i++) {
      const char = timestampPart[i];
      const value = base32Chars.indexOf(char);
      timestamp = timestamp * 32 + value;
    }
    
    return timestamp;
  }
}