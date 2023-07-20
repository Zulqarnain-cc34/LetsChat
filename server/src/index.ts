import { logger } from "./utils/logger";
import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Rooms } from "./entities/Rooms";
import { UserResolver } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { RoomResolver } from "./resolvers/RoomsResolver";
import { __prod__ } from "./constants";
import { rateLimiter } from "./middlewares/ratelimiter";
import { lypdCookie } from "./cookies/lypd";
//import cookieParser from "cookie-parser";
import cors from "cors";
//import { csrfProtection } from "./middlewares/csrf";
import helmet from "helmet";
import dotenv from "dotenv";
import http from "http";
import { myUrl } from "./middlewares/cors";
import { redis } from "./redis/redis";
import path from "path";
import { Members } from "./entities/Members";
import compression from "compression";

const main = async () => {
    logger.info("Application started");
    dotenv.config();
    logger.info("Enviormrntal Variables initialized");

    //LogRocket.init("ik0ybx/sunny-chat-app");

    //creating the connection woth database
    const conn = await createConnection({
        type:
            process.env.DATABASE_TYPE === "postgres" ? "postgres" : "postgres",
        url: process.env.DATABASE_URL,
        password: process.env.DATABASE_PASSWORD,
        migrations: [path.join(__dirname, "./migrations/*")],
        logging: process.env.DATABASE_LOG === "true" ? true : false,
        synchronize: process.env.DATABASE_SYNC == "true" ? true : false,
        entities: [Post, User, Rooms, Members],
    });
    const app = express();

    //Redis Connection initialization and setup of configuration
    //intialization of connection,creating redis client and setting up of store
    //port of the redis server not necessary
    //MiddleWares

    //limiting the amount of data thayt the server can recieve
    app.use(express.json({ limit: "10mb" }));

    app.set("trust proxy", true);

    app.disable("x-powered-by");

    //setting up cors for security
    app.use(cors(myUrl()));

    //rate limiter module to limit the number of requests made by a single user
    app.use(rateLimiter(redis));

    //Using express_session to make cookie
    app.use(lypdCookie);

    //a npm package to reduce bundle size
    app.use(compression());

    //app.use(csrfProtection());
    app.use(
        helmet({
            contentSecurityPolicy:
                process.env.NODE_ENV === "production" ? undefined : false,
        })
    );

    //using redis in application and starting a session
    //intialization of cookies as well
    //http server
    const pubsub = new PubSub();
    const port: string = process.env.NODE_PORT;

    logger.info("Starting Apollo Server");
    //Starting the apollo server with my user and post reslovers
    const apolloServer: ApolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver, RoomResolver],
            validate: false,
            pubSub: pubsub,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    logger.info("Apollo Server started");
    apolloServer.applyMiddleware({ app, cors: false });

    const httpServer = http.createServer(app);
    logger.info("httpServer Server started");

    apolloServer.installSubscriptionHandlers(httpServer);

    httpServer.listen(port, () => {
        console.log(
            `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
        );
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`
        );
    });
};

main().catch((err) => console.log(err));
