import { MiddlewareFn } from "type-graphql";

export const isRooms: MiddlewareFn = ({ args }, next) => {
    console.log(args);
    if (!args.roomId) {
        throw new Error(
            "You can only post in a selected room,you must login first"
        );
    }
    return next();
};
