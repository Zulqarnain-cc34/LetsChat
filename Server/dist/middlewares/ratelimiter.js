"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const rateLimiter = (redis) => {
    return new express_rate_limit_1.default({
        store: new rate_limit_redis_1.default({ client: redis }),
        windowMs: 60 * 60 * 1000,
        max: 100,
        delayMs: 0,
        message: "you have made a lot of requests you cannot excedd the limit",
    });
};
exports.rateLimiter = rateLimiter;
//# sourceMappingURL=ratelimiter.js.map