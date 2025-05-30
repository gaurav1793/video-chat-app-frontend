import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socketContext } from '../context/ScoketContext';
import UserFeedPlayer from '../Components/UserFeedPlayer';
import { HiPhoneMissedCall } from "react-icons/hi";
import { BsMicFill,BsMicMuteFill } from "react-icons/bs";
import { FaVideo ,FaVideoSlash } from "react-icons/fa6";


const Room:React.FC = () => {
  const {socket,user ,stream , peers} = useContext(socketContext)
  const {id}=useParams();
  const navigate = useNavigate();
  const [mute,setMute]=useState<boolean>(false);
  const [video,setVideo]=useState<boolean>(false);
  
  useEffect(()=>{
    if(user){
      console.log("New user with id", user._id, "has joined room", id,"with socket id",socket.id);
      socket.emit("joined-room",{roomId:id , peerId:user._id});
      socket.emit("ready")
    }
  },[user,id,socket])

  function getGridLayout(count: number) {
  if (count === 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-2';
  if (count <= 4) return 'grid-cols-2';
  if (count <= 6) return 'grid-cols-3';
  return 'grid-cols-4';
  }

  const endCall = ()=>{
    console.log("endcall clicked")
    socket.emit("user-leave",{
      peerId:user._id,
      roomId:id
    })
    navigate('/leave' ,{
     state:{ roomId:id }
    })
  }

  const muteCall =()=>{
    setMute(!mute);
    if (stream) {
      console.log("stream",stream);
      console.log( stream.getAudioTracks()[0])
      const audioTrack = stream.getAudioTracks()[0];
      console.log("audiotrack",audioTrack);
      console.log("audiotrack",audioTrack.enabled);
      audioTrack.enabled = !audioTrack.enabled;
    }
  }
  const muteVideo=()=>{
    setVideo(!video)
    if(stream){
      const videoTrack =stream.getVideoTracks()[0];
      videoTrack.enabled=!videoTrack.enabled
    }
  }
  return (
    <div className="flex flex-col h-screen w-full bg-slate-800">
      <div className="h-[60px] px-6 flex items-center justify-between border-b border-slate-700">
        <h1 className="text-white font-semibold text-lg">Room ID: {id}</h1>
      </div>

      <div className="flex-1 relative overflow-hidden px-4 py-3">
        <div className={`grid gap-4 w-full h-full ${getGridLayout(Object.keys(peers).length)}`}>
          {Object.keys(peers).map((peerId) => (
            <div key={peerId} className="w-full h-full border-2 border-white rounded-xl overflow-hidden">
              <UserFeedPlayer stream={peers[peerId].stream} />
            </div>
          ))}
        </div>

        <div className="w-1/5 aspect-video border-2 border-white rounded-xl overflow-hidden absolute bottom-4 right-4 z-50">
          <UserFeedPlayer stream={stream} />
        </div>
      </div>
      <div className="h-[80px] px-6 py-3 flex justify-center items-center gap-6 border-t border-slate-700">
        <label className='cursor-pointer'>
          <HiPhoneMissedCall className="h-7 w-7 md:h-12 md:w-12  rounded-full" 
          style={{"color":'red'}}/>
        <button onClick={endCall} className="hidden"></button>
        </label>
        <label className='cursor-pointer'>
          {mute?<BsMicMuteFill className="h-7 w-7 md:h-11 md:w-11  rounded-full" 
          style={{"color":'white'}}/> :<BsMicFill className="h-7 w-7 md:h-11 md:w-11  rounded-full" 
          style={{"color":'white'}}/>}
        <button onClick={muteCall} className="hidden"></button>
        </label>
        <label className='cursor-pointer'>
          {video?<FaVideoSlash className="h-7 w-7 md:h-11 md:w-11  rounded-full" 
          style={{"color":'white'}}/> :<FaVideo className="h-7 w-7 md:h-11 md:w-11  rounded-full" 
          style={{"color":'white'}}/>}
        <button onClick={muteVideo} className="hidden"></button>
        </label>
        
      </div>
    </div>
  )
}

export default Room