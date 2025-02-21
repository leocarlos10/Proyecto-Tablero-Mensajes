import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Form from './Components/Form'





function App() {

  return (
    <>
    <Routes>
      <Route path='/' element = {<HomePage/>}></Route>
      <Route path='/form/:tipo' element = {<Form/>}></Route>
      <Route path='/form/:tipo' element = {<Form/>}></Route>
    </Routes>
    </>
  )
}

export default App
