import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    const setUserAuthenticated = function (userAuthenticated) {
        localStorage.setItem('auth', JSON.stringify(userAuthenticated));
        setAuth(userAuthenticated);
    }

    return (
        <AuthContext.Provider value={{auth, setUserAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;