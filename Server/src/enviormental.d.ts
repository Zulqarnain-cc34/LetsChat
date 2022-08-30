declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUSHER_ID: string;
            PUSHER_KEY: string;
            PUSHER_SECRET: string;
            PUSHER_CLUSTER: string;
            PUSHER_TLS: string;
            PUSHER_ENCRPT: string;

            NODE_ENV: string;
            NODE_PORT: string;

            GMAIL_PASSWORD: string;

            DATABASE_TYPE: string;
            DATABASE_PORT: string;
            DATABASE_USER: string;
            DATABASE_HOST: string;
            DATABASE_PASSWORD: string;
            DATABASE_NAME: string;
            DATABASE_LOG: string;
            DATABASE_SYNC: string;
        }
    }
}
declare global {
    namespace Express {
        interface Session {
            userId: any;
        }
    }
}
export {};
