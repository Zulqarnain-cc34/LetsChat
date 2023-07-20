"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOfflineNotification = exports.DeleteFriendNotification = exports.MakeFriendNotification = exports.UserOnlineNotification = void 0;
const UserOnlineNotification = (username) => {
    return {
        notifier: "loginMutation",
        message: `${username} is Online`,
    };
};
exports.UserOnlineNotification = UserOnlineNotification;
const MakeFriendNotification = (username) => {
    return {
        notifier: "MakefriendMutation",
        message: `${username} is your friend`,
    };
};
exports.MakeFriendNotification = MakeFriendNotification;
const DeleteFriendNotification = (username) => {
    return {
        notifier: "DeletefriendMutation",
        message: `${username} has left your friends group`,
    };
};
exports.DeleteFriendNotification = DeleteFriendNotification;
const UserOfflineNotification = (username) => {
    return {
        notifier: "logoutMutation",
        message: `${username} is Offline`,
    };
};
exports.UserOfflineNotification = UserOfflineNotification;
//# sourceMappingURL=Notifications.js.map