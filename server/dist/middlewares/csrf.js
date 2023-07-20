"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfProtection = void 0;
const csurf_1 = __importDefault(require("csurf"));
const csrfProtection = () => csurf_1.default({ cookie: true });
exports.csrfProtection = csrfProtection;
//# sourceMappingURL=csrf.js.map