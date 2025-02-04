import { Injectable, LoggerService } from '@nestjs/common';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonUtilities } from 'nest-winston/dist/winston.utilities';

@Injectable()
export class AppLogger implements LoggerService, WinstonModuleOptionsFactory {
  private logger: LoggerService;

  // Implementação obrigatória da interface WinstonModuleOptionsFactory
  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    };
  }

  constructor() {
    // Inicialização do logger usando a configuração definida
    this.logger = winston.createLogger(this.createWinstonModuleOptions());
  }

  log(message: string, context?: string) {
    this.logger.log('info', message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.log('error', message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.log('warn', message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.log('debug', message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.log('verbose', message, { context });
  }
}
