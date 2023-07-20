export interface UserState {
    id: string;
    username: string;
}

export interface RoomState {
    id: string;
    Roomname: string;
    createdAt?: string;
    updatedAt?: string;
    adminId: string;
    members: number;
}

export interface FileTypes {
    data: any;
    name: string;
    size: number;
    type: string;
}

export interface AppStateTypes {
    user?: UserState;
    room?: RoomState;
    ref?: React.MutableRefObject<HTMLDivElement>;
}

export interface IActionTypes {
    type: string;
    payload: AppStateTypes;
}
