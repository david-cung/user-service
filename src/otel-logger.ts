import { LoggerProvider, BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const logExporter = new OTLPLogExporter({
  url: process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT 
    || 'http://otel-collector:4318/v1/logs',
  headers: {
    // Add any required headers for SigNoz if needed
    // 'Authorization': 'Bearer your-token',
  },
});

// Create logger provider without resource first - will use default resource
const loggerProvider = new LoggerProvider({
  processors: [new BatchLogRecordProcessor(logExporter)],
});

// Set the global logger provider
logs.setGlobalLoggerProvider(loggerProvider);

// Get a logger instance
const logger = loggerProvider.getLogger('user_service', '1.0.0');

// Correct way to emit logs
logger.emit({
  body: 'Application started',
  severityNumber: SeverityNumber.INFO,
  severityText: 'INFO',
  attributes: { 
    'service.name': process.env.OTEL_SERVICE_NAME || 'user_service',
    'deployment.environment': process.env.NODE_ENV || 'dev',
    foo: 'bar',
    timestamp: Date.now(),
  },
});

// Example of different log levels
logger.emit({
  body: 'Debug information',
  severityNumber: SeverityNumber.DEBUG,
  severityText: 'DEBUG',
  attributes: { 
    'service.name': process.env.OTEL_SERVICE_NAME || 'user_service',
    component: 'startup' 
  },
});

logger.emit({
  body: 'Warning message',
  severityNumber: SeverityNumber.WARN,
  severityText: 'WARN',
  attributes: { 
    'service.name': process.env.OTEL_SERVICE_NAME || 'user_service',
    component: 'validation' 
  },
});

logger.emit({
  body: 'Error occurred',
  severityNumber: SeverityNumber.ERROR,
  severityText: 'ERROR',
  attributes: { 
    'service.name': process.env.OTEL_SERVICE_NAME || 'user_service',
    error: 'Something went wrong',
    stack: 'error stack trace here',
  },
});

// Graceful shutdown
const shutdown = async () => {
  try {
    await loggerProvider.forceFlush();
    await loggerProvider.shutdown();
    console.log('Logger provider shut down successfully');
  } catch (error) {
    console.error('Error during shutdown:', error);
  }
};

// Handle different exit scenarios
process.on('beforeExit', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

export { logger, loggerProvider };