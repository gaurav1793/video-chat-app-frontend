import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LeavingPage:React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
     const { roomId } = location.state || {};

  return (
    <div className='flex  items-center justify-center min-h-screen w-full bg-slate-200 '>
        <div className='flex flex-col items-center justify-center gap-5  p-2 h-[500px] w-[500px] rounded-lg bg-white shadow-lg'>
            <button onClick={()=>{
            console.log("ye aayi hai bhai roomID",roomId);
            navigate(`/room/${roomId}`)
        }} className='btn btn-accent text-2xl h-16 text-white shadow-lg'>
            Rejoin
        </button>
        <button onClick={()=>{
           window.location.href = '/';
        }} className='btn btn-secondary text-3xl h-16 shadow-lg'>
            Home Page
        </button>
        </div>
    </div>
  )
}

export default LeavingPage