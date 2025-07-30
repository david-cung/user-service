interface JwtConfig {
  jwtSecretKey: string;
  jwtExpiresIn: string;
}

export const jwtConfig = (): JwtConfig => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  if (!jwtSecretKey) {
    throw new Error('JWT_SECRET_KEY environment variable is required');
  }

  return {
    jwtSecretKey,
    jwtExpiresIn: jwtExpiresIn || '7d',
  };
};