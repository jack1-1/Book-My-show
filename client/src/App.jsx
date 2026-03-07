// import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home';
import {BrowserRouter,Router,Route, Routes} from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
