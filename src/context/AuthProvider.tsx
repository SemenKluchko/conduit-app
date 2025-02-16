import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { AuthContextType } from "./types";
import {TOKEN_KEY} from "api/constants";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: React.ReactNode;
}


export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [login, setLogin] = useState<boolean | null>(!!Cookies.get(TOKEN_KEY));

    return (
        <AuthContext.Provider value={{ login, setLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
