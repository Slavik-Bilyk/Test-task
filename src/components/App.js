import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import UserPage from './pages/UserPage/UserPage'

const App = () => {
  return (
   <Routes>
    <Route path='/' index element={<Home/>}/>
    <Route path='user/:id' element={<UserPage/>}/>
   </Routes>
  )
}

export default App
