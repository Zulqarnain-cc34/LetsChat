import React, { createContext } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { AppStateTypes } from "../interfaces";
import { InitialState } from "./initialState";
import reducer from "./reducer";

export const StateContext = createContext<AppStateTypes | any>(InitialState);

export const StateProvider = (props: any): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, InitialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);
