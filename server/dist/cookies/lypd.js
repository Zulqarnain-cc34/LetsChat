"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lypdCookie = void 0;
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("../constants");
const redis_1 = require("../redis/redis");
exports.lypdCookie = express_session_1.default({
    name: constants_1.COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: false,
        sameSite: "lax",
        secure: false,
    },
    store: new redis_1.RedisStore({ client: redis_1.redis, disableTouch: true }),
    proxy: true,
});
//# sourceMappingURL=lypd.js.map