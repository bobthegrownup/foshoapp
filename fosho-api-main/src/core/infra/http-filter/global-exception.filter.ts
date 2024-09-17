import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception.status === 500 || !exception.status)
      Logger.error(exception.stack, 'ExceptionsHandler');

    exception.message = `Internal Server Error: ${exception.message}`;
    super.catch(exception, host);
  }
}
