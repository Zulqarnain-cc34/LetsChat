import pino from "pino";
import pinopretty from "pino-pretty";
// Create a logging instance
export const logger = pino({
    prettyPrint: {
        errorLikeObjectKeys: ["err", "error"], // --errorLikeObjectKeys
        errorProps: "ERROR", // --errorProps
        colorize: true,
        translateTime: "SYS:standard",
    },
    prettifier: pinopretty,
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
