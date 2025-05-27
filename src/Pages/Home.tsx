import React from 'react'
import { CreateRoom } from '../Components/CreateRoom'

const Home:React.FC = () => {
  return (
    <div data-theme="corporateDark" className='flex items-center justify-center min-h-screen w-full'>
        <CreateRoom/>
    </div>
  )
}

export default Home