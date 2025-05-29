import SocektIoClient from "socket.io-client";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {v4 as UUIDv4} from 'uuid'
import Peer from "peerjs"
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction, removePeerAction, resetAction } from "../Actions/peerActions";


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
    const [peers,dispatch]=useReducer(peerReducer,{});


    const fetchUserFeed = async()=>{
        const res = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setStream(res)
    }

    useEffect(()=>{

        const userId = UUIDv4();
        const newPeer = new Peer(userId , {
            host:"localhost",
            port:9000,
            path:"/myapp"
        });
        
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

    useEffect(()=>{
        if(!user || !stream){
            console.log("hai hi nhi yaar user , stream")
            return;
        }
        
        console.log("user",user,"strem",stream);
        socket.on("user-joined",({peerId})=>{
           const call = user.call(peerId,stream);
           console.log("calling the new peer",peerId);
           call.on("stream",(remoteStream)=>{
            dispatch(addPeerAction(peerId,remoteStream));
           })
        })

        user.on("call",(call)=>{ 
            //when others are calling
            console.log("receiving a call");
            call.answer(stream);
            call.on("stream",(remoteStream)=>{
            dispatch(addPeerAction(call.peer,remoteStream));
           })
        })
        
        console.log("calling ready");
        socket.emit("ready")

        socket.on("call-end",({peerId})=>{
            console.log("call end krdi esne => ",peerId)
            dispatch(removePeerAction(peerId));
        })
        socket.on("clear-my-peers",()=>{
            console.log("clearing my own peers my strem & peerid remain same &socket also remain same");
            dispatch(resetAction());
        })
    },[user,stream])
    
    return (
        <socketContext.Provider value={{socket,user,stream ,peers}}>
            {children}
        </socketContext.Provider>
    )
}