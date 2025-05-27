import SocektIoClient from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {v4 as UUIDv4} from 'uuid'
import Peer from "peerjs"


const ws_server = "http://localhost:3000";

export const socketContext = createContext<any|null>(null);

const socket=SocektIoClient(ws_server);

interface Props{
    children :React.ReactNode
}
export const SocketProvider :React.FC<Props> =({children})=>{
    const navigate = useNavigate();
    const [user,setUser]=useState<Peer>();
    const [stream , setStream]=useState<MediaStream>();



    const fetchUserFeed = async()=>{
        const res = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setStream(res)
    }

    useEffect(()=>{

        const userId = UUIDv4();
        const newPeer = new Peer(userId);

        setUser(newPeer); 
        fetchUserFeed();

        const enterRoom = ({roomId}: {roomId:string})=>{
            navigate(`/room/${roomId}`);
        }
        const fetchUsers = ({roomId ,participants}:{roomId:string , participants:string[]})=>{
            console.log("this is room id =>",roomId , "these are parciptnas:",participants);
        }

        socket.on("room-created",enterRoom);
        socket.on("get-users",fetchUsers);
    },[])
    return (
        <socketContext.Provider value={{socket,user,stream}}>
            {children}
        </socketContext.Provider>
    )
}