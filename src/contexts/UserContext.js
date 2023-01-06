import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({children}) {
    const userFromCookie = {
        id: document.cookie.split(",")[0],
        user_name: document.cookie.split(",")[1],
        profile_picture: document.cookie.split(",")[2]
    }
    const [user, setUser] = useState(userFromCookie);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}