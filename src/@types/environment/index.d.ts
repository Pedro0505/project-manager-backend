declare namespace NodeJS {
  interface ProcessEnv {
      JWT_SECRET: string;
      PORT: string;
      TOKEN_ADMIN: string;
  }
}