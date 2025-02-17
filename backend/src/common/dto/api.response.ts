export type PaginationResponse<T> = [T[], number];

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  timestamp: string;
  totalItems?: number;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    totalItems?: number,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.totalItems = totalItems;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    if (Array.isArray(data) && typeof data[1] === 'number') {
      return new ApiResponse(true, message, data[0], data[1]);
    }
    return new ApiResponse(true, message, data);
  }
}
