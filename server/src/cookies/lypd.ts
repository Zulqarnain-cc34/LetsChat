import session from "express-session";
import { COOKIE_NAME, __prod__ } from "../constants";
import { redis, RedisStore } from "../redis/redis";

export const lypdCookie = session({
    name: COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, //1 years
        httpOnly: false,
        sameSite: "lax", //csrf
        secure: false, //only works in https
    },
    store: new RedisStore({ client: redis, disableTouch: true }),
    proxy: true,
});
