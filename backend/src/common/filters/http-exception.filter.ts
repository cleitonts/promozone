import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse, ErrorResponse } from '../dto/api.response';
import { AppLogger } from '../logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: ErrorResponse;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      errorResponse = new ErrorResponse(
        exception.name,
        status,
        typeof response === 'object' ? response : { message: response },
        process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      );
    } else {
      const error = exception as Error;
      errorResponse = new ErrorResponse(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { message: error.message },
        process.env.NODE_ENV === 'development' ? error.stack : undefined,
      );
    }

    this.logger.error(
      `Error: ${errorResponse.code} - ${request.method} ${request.url}`,
      errorResponse.stack,
      'HTTP Exception Filter',
    );

    response.status(status).json(ApiResponse.error(errorResponse));
  }
}
