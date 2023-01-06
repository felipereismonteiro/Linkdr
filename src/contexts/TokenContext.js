import { createContext, useState } from "react";

export const TokenContext = createContext();

export function TokenContextProvider({children}) {
    const tokenFromCookie =  document.cookie.split(",")[0];
    const [token, setToken] = useState(tokenFromCookie);
    return(
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}