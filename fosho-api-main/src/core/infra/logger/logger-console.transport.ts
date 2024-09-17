import * as winston from 'winston';
import { LoggerConfig } from './logger.config';
import { green, yellow } from 'colorette';

export class ConsoleTransport {
  static create() {
    return new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp({
          format: LoggerConfig.getDefaultLoggerTimezoned(),
        }),
        winston.format.colorize({
          colors: {
            info: 'blue',
            debug: 'yellow',
            error: 'red',
          },
        }),
        winston.format.printf((info) => {
          const timestamp = info.timestamp;
          const level = info.level;
          const context = info.context ? info.context : info.stack;
          const message =
            typeof info.message == 'object'
              ? JSON.stringify(info.message)
              : info.message;

          return `[${level}]  ${timestamp} ${yellow(`[${context}]`)} ${green(
            message,
          )}`;
        }),
      ),
    });
  }
}
