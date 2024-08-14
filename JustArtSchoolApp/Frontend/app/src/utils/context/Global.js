import { createContext, useState } from "react";

const GlobalContext = createContext({});

export const Global = ({ children }) => {
    const[global, setGlobal] = useState({sidebarState:true});
    return (
        <GlobalContext.Provider value={{global, setGlobal}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;