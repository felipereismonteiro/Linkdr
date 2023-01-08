import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({children}) {
    const userFromCookie = {
        id: document.cookie.split(",")[1],
        user_name: document.cookie.split(",")[2],
        profile_picture: document.cookie.split(",")[3]
    }
    const [user, setUser] = useState(userFromCookie);
    const [userPageInfo, setUserPageInfo] = useState({})
    return(
        <UserContext.Provider value={{user, setUser, userPageInfo, setUserPageInfo}}>
            {children}
        </UserContext.Provider>
    )
}