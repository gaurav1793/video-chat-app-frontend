import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { socketContext } from '../context/ScoketContext';
import UserFeedPlayer from '../Components/UserFeedPlayer';

const Room:React.FC = () => {
  const {socket,user ,stream} = useContext(socketContext)
  const {id}=useParams();
  
  useEffect(()=>{
    if(user){
      console.log("user",user);
      socket.emit("joined-room",{roomId:id , peerId:user._id});
      
    }
  },[user,id,socket])
  return (
    <div>
      Room id = {id}
      <UserFeedPlayer stream={stream}/>
    </div>
  )
}

export default Room