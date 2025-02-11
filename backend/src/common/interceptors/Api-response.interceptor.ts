import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse, ErrorResponse } from '../dto/api.response';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();

        if (response.statusCode >= 400) {
          return data;
        }

        return ApiResponse.success(data);
      }),
      catchError((err) => {
        let status: number;
        let code: string;
        let details: any;
        let stack: string | undefined;

        // Se o erro for uma instância de HttpException, extrai as informações dele
        if (err instanceof HttpException) {
          status = err.getStatus();
          // Neste exemplo, usamos a mensagem do erro como "code".
          code = err.message || 'Error occurred';
          details = err.getResponse();
          stack = err.stack;
        } else {
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          code = 'InternalServerError';
          details = err;
          stack = err.stack;
        }

        const errorResponse = new ErrorResponse(code, status, details, stack);
        return of(ApiResponse.error(errorResponse, code));
      }),
    );
  }
}
