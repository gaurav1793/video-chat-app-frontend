import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Room from './Pages/Room'
import LeavingPage from './Pages/LeavingPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/room/:id' element={<Room/>}/>
        <Route path='/leave' element={<LeavingPage/>}/>
      </Routes>
    </>
  )
}

export default App
