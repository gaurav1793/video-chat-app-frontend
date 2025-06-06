import React, { useContext, useState } from 'react'
import { socketContext } from '../context/ScoketContext'
import { useNavigate } from 'react-router-dom';

export const CreateRoom:React.FC = () => {
    const {socket} =useContext(socketContext)
    const [val,setVal]=useState<string>('');
    const navigate = useNavigate();
    const initRoom =()=>{
        socket.emit("create-room");
    }

    const joinRoom=()=>{
      navigate(`/room/${val}`)
    }
  return (
    <>
      <div  className='flex flex-col  items-center justify-center min-h-screen w-full bg-slate-200 '>
        <button onClick={initRoom} className='btn btn-secondary h-12 text-xl font-semibold '>
         Start a New Meeting
      </button>
      <div className='mt-4 flex justify-center items-center gap-2' >
        <input placeholder='enter room code' value={val} onChange={(e)=>{setVal(e.target.value)}}
               className='h-12 rounded-md p-2'
        />
        <button onClick={joinRoom} className='btn btn-accent h-12 text-xl font-semibold'>Join Room</button>
      </div>
      </div>
    </>
  )
}
