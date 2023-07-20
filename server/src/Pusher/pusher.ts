import { PusherChannel } from "graphql-pusher-subscriptions";

export const pusher = new PusherChannel({
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    appId: process.env.PUSHER_ID,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: process.env.PUSHER_TLS === "true" ? true : false,
    channel: "graphql-subscription",
    //encrypted: process.env.PUSHER_ENCRPT === "true" ? true : false,
});
//export const channel: string = "lireddit";
