import { createContext, useEffect, useState } from "react";
import { apiLoggedInInstances } from "../getApi/axios";

export const userContext  =createContext({});
const userProvider  = ({children}) =>{
    const [user,setUser] = useState();
    const handelLogOut = () =>{
        setUser(null)
    }
    useEffect(() => {
        apiLoggedInInstances({
            url: "/api/auth/user-info"
        }).then(response => {
            setUser(response);
        })
    },[])
    return(
        <userContext.Provider value={(user,setUser,handelLogOut)}>
            {children}
        </userContext.Provider>
    )
}
export default userProvider;