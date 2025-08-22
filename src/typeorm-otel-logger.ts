// src/typeorm-otel-logger.ts
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { logger } from './otel-logger'; // the logger you set up for SigNoz

export class TypeOrmOtelLogger implements TypeOrmLogger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.emit({
      severityText: 'INFO',
      body: `SQL Query: ${query}`,
      attributes: {
        parameters: JSON.stringify(parameters || []),
        status_code: 200,
        db_system: 'postgres',
      },
    });
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.emit({
      severityText: 'ERROR',
      body: `SQL Error: ${error}`,
      attributes: {
        query,
        parameters: JSON.stringify(parameters || []),
        status_code: 500,
        db_system: 'postgres',
      },
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.emit({
      severityText: 'WARN',
      body: `Slow Query (${time}ms): ${query}`,
      attributes: {
        parameters: JSON.stringify(parameters || []),
        time,
        db_system: 'postgres',
      },
    });
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    logger.emit({
      severityText: 'INFO',
      body: `Schema Build: ${message}`,
      attributes: { db_system: 'postgres' },
    });
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    logger.emit({
      severityText: 'INFO',
      body: `Migration: ${message}`,
      attributes: { db_system: 'postgres' },
    });
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    logger.emit({
      severityText: level.toUpperCase(),
      body: message,
      attributes: { db_system: 'postgres' },
    });
  }
}
