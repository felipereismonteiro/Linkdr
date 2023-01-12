import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({children}) {

    const [user, setUser] = useState();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        if(userData) {
            setUser(userData.user)
        }
    }, [])

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}