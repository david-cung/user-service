import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

// Interface cho database config
interface DatabaseConfig {
  host: string;
  type: 'mysql';
  port: number;
  username: string;
  password: string;
  database: string;
  timezone: string;
  logging: boolean;
  autoLoadEntities: boolean;
  keepConnectionAlive: boolean;
  entities: string[];
  extra: {
    connectionLimit: number;
    charset: string;
  };
  charset: string;
}

export default registerAs('db', (): DatabaseConfig => {
  // Validate required environment variables
  const requiredEnvs = [
    'DATABASE_HOST',
    'DATABASE_USERNAME', 
    'DATABASE_PASSWORD',
    'DATABASE_DB_NAME'
  ];

  for (const env of requiredEnvs) {
    if (!process.env[env]) {
      throw new Error(`Missing required environment variable: ${env}`);
    }
  }

  return {
    host: process.env.DATABASE_HOST!,
    type: 'mysql',
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_DB_NAME!,
    timezone: 'Z',
    logging: process.env.ORM_LOGGING === 'true',
    autoLoadEntities: true,
    keepConnectionAlive: true,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    extra: {
      connectionLimit: parseInt(process.env.ORM_CONNECTION_LIMIT || '10', 10),
      charset: 'utf8mb4_general_ci',
    },
    charset: 'utf8mb4',
  };
});