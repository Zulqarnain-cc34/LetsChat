"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./utils/logger");
require("reflect-metadata");
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const Rooms_1 = require("./entities/Rooms");
const UserResolver_1 = require("./resolvers/UserResolver");
const PostResolver_1 = require("./resolvers/PostResolver");
const RoomsResolver_1 = require("./resolvers/RoomsResolver");
const ratelimiter_1 = require("./middlewares/ratelimiter");
const lypd_1 = require("./cookies/lypd");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_2 = require("./middlewares/cors");
const redis_1 = require("./redis/redis");
const path_1 = __importDefault(require("path"));
const Members_1 = require("./entities/Members");
const compression_1 = __importDefault(require("compression"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Application started");
    dotenv_1.default.config();
    logger_1.logger.info("Enviormrntal Variables initialized");
    const conn = yield typeorm_1.createConnection({
        type: process.env.DATABASE_TYPE === "postgres" ? "postgres" : "postgres",
        url: process.env.DATABASE_URL,
        password: process.env.DATABASE_PASSWORD,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        logging: process.env.DATABASE_LOG === "true" ? true : false,
        synchronize: process.env.DATABASE_SYNC == "true" ? true : false,
        entities: [Post_1.Post, User_1.User, Rooms_1.Rooms, Members_1.Members],
    });
    const app = express_1.default();
    app.use(express_1.default.json({ limit: "10mb" }));
    app.set("trust proxy", true);
    app.disable("x-powered-by");
    app.use(cors_1.default(cors_2.myUrl()));
    app.use(ratelimiter_1.rateLimiter(redis_1.redis));
    app.use(lypd_1.lypdCookie);
    app.use(compression_1.default());
    app.use(helmet_1.default({
        contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
    }));
    const pubsub = new apollo_server_express_1.PubSub();
    const port = process.env.NODE_PORT;
    logger_1.logger.info("Starting Apollo Server");
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [PostResolver_1.PostResolver, UserResolver_1.UserResolver, RoomsResolver_1.RoomResolver],
            validate: false,
            pubSub: pubsub,
        }),
        context: ({ req, res }) => ({ req, res, redis: redis_1.redis }),
    });
    logger_1.logger.info("Apollo Server started");
    apolloServer.applyMiddleware({ app, cors: false });
    const httpServer = http_1.default.createServer(app);
    logger_1.logger.info("httpServer Server started");
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`);
    });
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map