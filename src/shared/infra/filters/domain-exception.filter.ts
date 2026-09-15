import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidCredentialsException } from '@/auth/domain/exceptions/InvalidCredentials.exception';

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof InvalidCredentialsException) {
      status = HttpStatus.UNAUTHORIZED;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
