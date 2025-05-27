import React, { useContext } from 'react'
import { socketContext } from '../context/ScoketContext'

export const CreateRoom:React.FC = () => {
    const {socket} =useContext(socketContext)

    const initRoom =()=>{
        socket.emit("create-room");
    }
  return (
    <button onClick={initRoom} className='btn btn-secondary'>
        start a new meeting in a new room
    </button>
  )
}
