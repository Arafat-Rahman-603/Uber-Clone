import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import RiderLogin from './pages/RiderLogin'
import RiderSignup from './pages/RiderSignup'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/user/signup' element={<UserSignup />} />
      <Route path='/rider/login' element={<RiderLogin />} />
      <Route path='/rider/signup' element={<RiderSignup />} />
    </Routes>
    </>
  ) 
}

export default App
