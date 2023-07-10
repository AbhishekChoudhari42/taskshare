import { useContext , createContext, useEffect } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext()


export const socket = io('http://localhost:3030')

const SocketContextProvider = ({children}) =>{



    useEffect(()=>{

    },[socket])

    return (
        <SocketContext.Provider value = {socket}>
            {children}
        </SocketContext.Provider>
    )

} 

export default SocketContextProvider

