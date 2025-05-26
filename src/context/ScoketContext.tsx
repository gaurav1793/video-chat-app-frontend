import SocektIoClient from "socket.io-client";
import React, { createContext } from "react";


const ws_server = "http://localhost:3000";

const socketContext = createContext<any|null>(null);

const socket=SocektIoClient(ws_server);

interface Props{
    children :React.ReactNode
}
export const SocketProvider :React.FC<Props> =({children})=>{
    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}