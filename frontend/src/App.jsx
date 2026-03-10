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
import RiderHome from './pages/RiderHome'
import RiderProtectedCom from './components/RiderProtectedCom'
import RiderRideing from './pages/RiderRideing'

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
        <RiderProtectedCom>
          <RiderLogout />
        </RiderProtectedCom>
      } />
      <Route path='/user/rideing' element={
        <UserProtectedCom>
        <Rideing />
        </UserProtectedCom>
        } />
      <Route path='/rider/home' element={
        <RiderProtectedCom>
          <RiderHome />
        </RiderProtectedCom>
      } />
      <Route path='/rider/rideing' element={
        <RiderProtectedCom>
          <RiderRideing/>
        </RiderProtectedCom>
      } />
    </Routes>
    </>
  ) 
}

export default App
