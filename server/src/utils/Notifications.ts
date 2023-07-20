import { Notifications } from "./../resolvers/Objecttypes/UserObject";

const UserOnlineNotification = (username: string): Notifications => {
    return {
        notifier: "loginMutation",
        message: `${username} is Online`,
    };
};

const MakeFriendNotification = (username: string): Notifications => {
    return {
        notifier: "MakefriendMutation",
        message: `${username} is your friend`,
    };
};

const DeleteFriendNotification = (username: string): Notifications => {
    return {
        notifier: "DeletefriendMutation",
        message: `${username} has left your friends group`,
    };
};
const UserOfflineNotification = (username: string): Notifications => {
    return {
        notifier: "logoutMutation",
        message: `${username} is Offline`,
    };
};

export {
    UserOnlineNotification,
    MakeFriendNotification,
    DeleteFriendNotification,
    UserOfflineNotification,
};
