import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    res.on('close', () => {
      Logger.debug(
        {
          message: `${req.method} ${req.originalUrl} ${res.statusCode} - 
        Content-length: ${res.getHeader('Content-Length') || ''} - Agent: ${
          req.get('user-agent') || ''
        } - ${res.getHeader('X-Response-Time')}`,
        },
        'Request',
      );
    });
    next();
  }
}
