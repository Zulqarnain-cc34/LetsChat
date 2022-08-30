"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRooms = void 0;
const isRooms = ({ args }, next) => {
    console.log(args);
    if (!args.roomId) {
        throw new Error("You can only post in a selected room,you must login first");
    }
    return next();
};
exports.isRooms = isRooms;
//# sourceMappingURL=isRooms.js.map