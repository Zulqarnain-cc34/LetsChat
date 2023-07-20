"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const graphql_pusher_subscriptions_1 = require("graphql-pusher-subscriptions");
exports.pusher = new graphql_pusher_subscriptions_1.PusherChannel({
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    appId: process.env.PUSHER_ID,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: process.env.PUSHER_TLS === "true" ? true : false,
    channel: "graphql-subscription",
});
//# sourceMappingURL=pusher.js.map