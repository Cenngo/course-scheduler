import {createContext, useContext, useState} from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    user: undefined
});

export function AuthProvider({children, ...props})
{
    const [state, setState] = useState({
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
        user: {username: "Cenk Ergen"}
    });

    return <AuthContext.Provider value={state} {...props}>
        {children}
    </AuthContext.Provider>;
}

export function useAuth()
{
    return useContext(AuthContext);
}