import './App.css'
import {Routes, Route} from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import RiderLogin from './pages/RiderLogin'
import RiderSignup from './pages/RiderSignup'
import UserLogout from './pages/UserLogout'
import RiderLogout from './pages/RiderLogout'
import UserProtectedCom from './pages/UserProtectedCom'
import Rideing from './pages/Rideing'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/home' element={
        <UserProtectedCom>
          <Home />
        </UserProtectedCom>
      } />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/user/signup' element={<UserSignup />} />
      <Route path='/user/logout' element={
        <UserProtectedCom>
          <UserLogout />
        </UserProtectedCom>
      } />
      <Route path='/rider/login' element={<RiderLogin />} />
      <Route path='/rider/signup' element={<RiderSignup />} />
      <Route path='/rider/logout' element={
        <UserProtectedCom>
          <RiderLogout />
        </UserProtectedCom>
      } />
      <Route path='/rideing' element={<Rideing />} />
    </Routes>
    </>
  ) 
}

export default App
