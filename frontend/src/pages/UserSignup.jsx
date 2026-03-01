import React from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useState } from 'react'
import { useUserStore } from '../../store/userStore';
import axios from 'axios';

export default function UserSignup() {

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [hidepassword, setHidePassword] = useState(false);
  const [hideconfirmPassword, setHideConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(passwordRef.current.value !== confirmPasswordRef.current.value){
      alert("Passwords do not match");
      return;
    }

    const userSignupData = {
      fullName:{
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
      },
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
   
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userSignupData);
    if(response.status === 201){
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/home');
    }
  };

  return (
    <>
    <div className='w-full h-screen flex-col flex px-4 pt-8 pb-4 h-max '>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <p className="text-[1rem] font-bold">Book your first ride,</p>
          <p className="text-[1.5rem] font-bold leading-0">Enter your details below!</p>
        </div>
        <input 
        type="text"
        className='border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold' 
        required
        placeholder='First Name'
        ref={firstNameRef}
         />
         <input 
        type="text"
        className='border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold' 
        placeholder='Last Name'
        ref={lastNameRef}
         />
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
         <div className="relative">
            <input 
                type={hidepassword ? "text" : "password"}
                className='border-2 border-gray-200 rounded-md p-2 w-full h-12 mt-2 mx-auto font-semibold' 
                required
                placeholder='Enter your password'
                ref={confirmPasswordRef}
            />
            <p onClick={() => setHideConfirmPassword(!hideconfirmPassword)}>
                {hideconfirmPassword ? <FaRegEye className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'/> : <FaRegEyeSlash className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'/>}
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
    <div className="absolute bottom-4 w-full p-4">
        <Link 
            to="/"
            className='bg-[#F6BE00] text-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto font-semibold active:scale-95  transition-all duration-300 cursor-pointer'
        > 
          <p className=""></p>
          <span className='text-xl'>Go Home</span>
          <FaArrowRight className=''/>
        </Link>
      </div>
    </>
  )
}
