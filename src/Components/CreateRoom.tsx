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
      <button onClick={initRoom} className='btn btn-secondary'>
        start a new meeting in a new room
      </button>
      <div className='mt-4 flex justify-center items-center gap-2' >
        <input placeholder='enter room code' value={val} onChange={(e)=>{setVal(e.target.value)}}
               className='h-9'
        />
        <button onClick={joinRoom} className='btn btn-accent'>Join Room</button>
      </div>
    </>
  )
}
