declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_SECRET_KEY: string;
      DB_URL: string;
      LOGIN_EXPIRE: string;
      ADD_PASSWORD: string;
      SALT_ROUND: string;
    }
  }
}

export {};
