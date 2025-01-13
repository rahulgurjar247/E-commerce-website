import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Navbar from './component/navbar'
import { Home } from './pages/home'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import { ProductDetail } from './pages/Productsdetail'

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/product/:id/:userId' element={<ProductDetail/>} />
          <Route path='/add-item' element={<Home/>} />
        </Routes>
    </>
  )
}

export default App
