import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export function TokenContextProvider({children}) {
    const [token, setToken] = useState();
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        if(userData) {
            setToken(userData.token)
        }
    }, [])
    
    return(
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}