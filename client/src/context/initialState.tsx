import { AppStateTypes, RoomState, UserState } from "../interfaces";

const UserIState: UserState = { id: "0", username: "" };

const RoomIState: RoomState = {
    id: "",
    Roomname: "",
    createdAt: "",
    updatedAt: "",
    adminId: "",
    members: 0,
};

export const InitialState: AppStateTypes = {
    user: UserIState,
    room: RoomIState,
    ref: null,
};
