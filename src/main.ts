/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user-service-client',
          brokers: ['localhost:9092'],
          connectionTimeout: 10000,
          requestTimeout: 30000,
        },
        consumer: {
          groupId: 'user-consumer',
          sessionTimeout: 30000,
          heartbeatInterval: 3000,
        },
      },
    },
  );

  try {
    await app.listen();
    console.log('User Service is listening to Kafka...');
  } catch (error) {
    console.error('Failed to start Kafka microservice:', error);
    process.exit(1);
  }
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();