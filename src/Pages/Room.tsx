import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socketContext } from '../context/ScoketContext';
import UserFeedPlayer from '../Components/UserFeedPlayer';

const Room:React.FC = () => {
  const {socket,user ,stream , peers} = useContext(socketContext)
  const {id}=useParams();
  const navigate = useNavigate();
  
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
        <button onClick={endCall} className="bg-red-600 text-white px-4 py-2 rounded-lg">End Call</button>
        <button  className="bg-slate-600 text-white px-4 py-2 rounded-lg">Mic Off</button>
        <button className="bg-slate-600 text-white px-4 py-2 rounded-lg">Camera Off</button>
      </div>
    </div>
  )
}

export default Room