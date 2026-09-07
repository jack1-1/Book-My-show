// import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {BrowserRouter,Router,Route, Routes} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Admin from './pages/Admin';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
