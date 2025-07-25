/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true, // để mọi nơi đều dùng được config
      envFilePath: '.env', // mặc định cũng là .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        host: config.get('DB_HOST'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        port: +(config.get<number>('DB_PORT') ?? 5432),
        username: config.get('DB_USERNAME') ?? 'postgres',
        password: config.get('DB_PASSWORD') ?? 'password',
        database: config.get('DB_DATABASE') ?? 'mydb',

        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
