declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_TYPE: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    NODE_PORT: string;
    DATABASE_LOG: string;
    DATABASE_SYNC: string;
    PUSHER_ID : string;
    PUSHER_KEY : string;
    PUSHER_SECRET : string;
    PUSHER_CLUSTER : string;
    PUSHER_TLS: string;
    PUSHER_ENCRPT: string;
    SESSION_SECRET: string;
    DATABASE_PASSWORD: string;
    CLOUD_EMAIL: string;
  }
}
