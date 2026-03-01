import React, { useRef } from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useUserStore } from '../../store/userStore';
import axios from 'axios';


export default function UserLogin() {
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [hidepassword, setHidePassword] = useState(false);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const userLoginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, userLoginData);
    if(response.status === 200){
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/home');
    }
  };

  return (
    <>
    <div className='w-full h-[60vh] flex-col flex px-4 pt-8 pb-4 h-max '>
      <form onSubmit={handleSubmit}>
        <p className="text-[1.5rem] font-bold">
          What's your email?
        </p>
        <input 
        type="email"
        className='border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold' 
        required
        placeholder='Enter your email'
        ref={emailRef}
         />
         <div className="relative">
            <input 
                type={hidepassword ? "text" : "password"}
                className='border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold' 
                required
                placeholder='Enter your password'
                ref={passwordRef}
            />
            <p onClick={() => setHidePassword(!hidepassword)}>
                {hidepassword ? <FaRegEye className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'/> : <FaRegEyeSlash className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'/>}
            </p>
         </div>
        <button 
            type='submit'
            className='bg-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer'
        > 
          <p className=""></p>
          <span className='text-xl'>Continue</span>
          <FaArrowRight className=''/>
        </button>
      </form>
    </div>
    <div className="flex items-center gap-2 px-4 justify-center">
      <hr className='border-2 border-gray-200 w-1/2'/>
      <p className="text-[1rem] pb-1 font-bold text-gray-400">
        or
      </p>
      <hr className='border-2 border-gray-200 w-1/2'/>
    </div>
    <div className="p-4">
        <Link 
            to="/user/signup"
            className='bg-[#F6BE00] text-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer'
        > 
          <p className=""></p>
          <span className='text-xl'>Sign Up</span>
          <FaArrowRight className=''/>
        </Link>

        <Link 
            to="/rider/login"
            className='bg-[#F6BE00] text-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer'
        > 
          <p className=""></p>
          <span className='text-xl'>Sign In As Rider</span>
          <FaArrowRight className=''/>
        </Link>

        <Link 
            to="/rider/signup"
            className='bg-[#F6BE00] text-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer'
        > 
          <p className=""></p>
          <span className='text-xl'>Sign Up As Rider</span>
          <FaArrowRight className=''/>
        </Link>
      </div>
    </>
  )
}
