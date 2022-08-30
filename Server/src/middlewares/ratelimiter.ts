import rateLimit from "express-rate-limit";
import { Redis } from "ioredis";
import RateLimiterStore from "rate-limit-redis";

export const rateLimiter = (redis: Redis) => {
    return new rateLimit({
        store: new RateLimiterStore({ client: redis }),
        windowMs: 60 * 60 * 1000,
        max: 100,
        delayMs: 0,
        message: "you have made a lot of requests you cannot excedd the limit",
    });
};
