import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

// Export traces to the SigNoz otel-collector
const traceExporter = new OTLPTraceExporter({
  url: 'http://otel-collector:4318/v1/traces', // SigNoz otel-collector endpoint
});

// Export metrics to the SigNoz otel-collector
const metricExporter = new OTLPMetricExporter({
  url: 'http://otel-collector:4318/v1/metrics',
});

const sdk = new NodeSDK({
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the SDK before NestJS app
try {
  sdk.start();
  console.log('✅ OpenTelemetry started');
} catch (err) {
  console.error('OpenTelemetry error', err);
}
