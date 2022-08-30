import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";

export const RedisStore = connectRedis(session);
export const redis = new Redis(process.env.REDIS_URL);
