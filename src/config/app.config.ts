interface AppConfig {
  port: number;
  bcryptSalt: number;
  minPasswordLength: number;
  maxPasswordLength: number;
  apiPrefix: string;
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),
  bcryptSalt: parseInt(process.env.BCRYPT_SALT || '10', 10),
  minPasswordLength: 8,
  maxPasswordLength: 24,
  apiPrefix: process.env.API_PREFIX || 'api',
});