import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './routes/Home'
import Command from './routes/Command'
import NotFound from './routes/NotFound'


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Command" element={<Command />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App