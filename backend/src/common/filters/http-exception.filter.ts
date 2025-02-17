import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../dto/api.response';
import { AppLogger } from '../logger.service';
import { Code } from 'typeorm';

interface IErrorResponse {
  code: string;
  status: HttpStatus;
  details?: any;
  stack?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: IErrorResponse;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      errorResponse = {
        code: exception.name,
        status,
        details:
          typeof response === 'object' ? response : { message: response },
        stack:
          process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      };
    } else {
      const error = exception as Error;
      errorResponse = {
        code: 'INTERNAL_ERROR',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        details: { message: error.message },
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }

    this.logger.error(
      `Error: ${errorResponse.code} - ${request.method} ${request.url}`,
      errorResponse.stack,
      'HTTP Exception Filter',
    );

    response.status(status).json(errorResponse);
  }
}
