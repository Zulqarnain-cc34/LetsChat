import React, { useContext, useState } from "react";
import { createContext } from "react";

type userObject = {
    id: number;
    username: string;
    createdAt: number;
    updatedAt: number;
};

type UserContextType = {
    user: userObject | undefined;
    setuser: React.Dispatch<any>;
};

const initialState = {
    user: {
        id: 0,
        username: "",
        createdAt: 0,
        updatedAt: 0,
    },
    setuser: () => null,
};

const UserContext = createContext<UserContextType>(initialState);

type Props = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
    const [user, setuser] = useState<userObject>();

    return (
        <UserContext.Provider value={{ user, setuser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
