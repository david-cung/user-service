// src/logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from './otel-logger'; // Adjust the import path as necessary

@Injectable()
export class AppLogger implements LoggerService {
 log(message: string, context?: string, statusCode?: number) {
    logger.emit({
      severityText: 'INFO',
      body: message,
      attributes: {
        context: context || 'app',
        status_code: statusCode || 200,
      },
    });
  }

  error(message: string, trace?: string, context?: string, statusCode?: number) {
    logger.emit({
      severityText: 'ERROR',
      body: message,
      attributes: {
        context: context || 'app',
        trace: trace || '',
        status_code: statusCode || 500,
      },
    });
  }

  warn(message: string, context?: string, statusCode?: number) {
    logger.emit({
      severityText: 'WARN',
      body: message,
      attributes: {
        context: context || 'app',
        status_code: statusCode || 400,
      },
    });
  }
}
