import './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
       bufferLogs: true,
    }
  );

  const logger = new Logger('Bootstrap');
  app.useLogger(logger);

  // Cấu hình TCP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });

  // Cấu hình Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-service',
        brokers: ['kafka:9093'],
      },
      consumer: {
        groupId: 'user-consumer-group',
      },
    },
  });

  // Khởi động tất cả microservices
  await app.startAllMicroservices();
  await app.listen(3030);
  console.log(`User Service is running on: 3030`);
}
bootstrap();
