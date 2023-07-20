"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
exports.logger = pino_1.default({
    prettyPrint: {
        errorLikeObjectKeys: ["err", "error"],
        errorProps: "ERROR",
        colorize: true,
        translateTime: "SYS:standard",
    },
    prettifier: pino_pretty_1.default,
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
//# sourceMappingURL=logger.js.map