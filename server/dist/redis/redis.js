"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.RedisStore = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
exports.RedisStore = connect_redis_1.default(express_session_1.default);
exports.redis = new ioredis_1.default(process.env.REDIS_URL);
//# sourceMappingURL=redis.js.map