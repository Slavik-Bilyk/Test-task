import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'

const App = () => {
  return (
   <Routes>
    <Route path='/' index element={<Home/>}/>
    <Route path='contact/:id' element={<Contact/>}/>
   </Routes>
  )
}

export default App
