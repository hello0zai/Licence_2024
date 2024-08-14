import React, {createContext, useEffect, useState} from 'react'
import useAuth from "../hooks/useAuth";
const PersistAuthProviderContext = createContext({});
function PersistAuthProvider({children}) {
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        if(auth?.userAuthenticated) {
            const user = JSON.stringify(auth?.userAuthenticated);
            localStorage.setItem('userAuthenticated',user);
        } else {
            const user = JSON.parse(localStorage.getItem('userAuthenticated'));
            if(user) {
                setAuth(user);
            }
        }
    }, []);

    return (
        <PersistAuthProviderContext.Provider>
            {children}
        </PersistAuthProviderContext.Provider>
    )
}

export default PersistAuthProvider
