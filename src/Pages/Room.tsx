import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { socketContext } from '../context/ScoketContext';
import UserFeedPlayer from '../Components/UserFeedPlayer';

const Room:React.FC = () => {
  const {socket,user ,stream , peers} = useContext(socketContext)
  const {id}=useParams();
  
  useEffect(()=>{
    if(user){
      console.log("New user with id", user._id, "has joined room", id);
      socket.emit("joined-room",{roomId:id , peerId:user._id});
    }
  },[user,id,socket ])

  return (
    <div>
      Room id = {id}
      <br/>
      My Feed 
      <UserFeedPlayer stream={stream}/>
      <div>
        Other User Feed
        {Object.keys(peers).map((peerId)=>(
          <>
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream}/>
          </>
        ))}
      </div>
    </div>
  )
}

export default Room