import { AppStateTypes, IActionTypes } from "../interfaces";
import * as actionTypes from "./actionsTypes";
import { InitialState } from "./initialState";

const reducer = (
    state: AppStateTypes = InitialState,
    action: IActionTypes
): AppStateTypes => {
    switch (action.type) {
        case actionTypes.GET_SESSION:
            return {
                ...state,
                user: action.payload.user,
            };

        case actionTypes.REMOVE_SESSION:
            return {
                ...state,
                user: null,
            };
        case actionTypes.GET_ROOM:
            return { ...state, room: action.payload.room };
        case actionTypes.UPLOAD_IMAGE:
            return { ...state, ref: action.payload.ref };
        default:
            return state;
    }
};
export default reducer;
