import { HttpStatus } from '@nestjs/common';

export type PaginationResponse<T> = [T[], number];

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  message: string;
  timestamp: string;
  totalItems?: number;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    error?: ErrorResponse,
    totalItems?: number,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.totalItems = totalItems;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    if (Array.isArray(data) && typeof data[1] === 'number') {
      return new ApiResponse(true, message, data[0], undefined, data[1]);
    }
    return new ApiResponse(true, message, data);
  }

  static error(
    error: ErrorResponse,
    message = 'Error occurred',
  ): ApiResponse<null> {
    return new ApiResponse(false, message, null, error);
  }
}

export class ErrorResponse {
  code: string;
  status: HttpStatus;
  details?: any;
  stack?: string;

  constructor(code: string, status: HttpStatus, details?: any, stack?: string) {
    this.code = code;
    this.status = status;
    this.details = details;
    this.stack = stack;
  }
}
