import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


export default function Home() {
  return (
   <div className="flex bg-[url(./home-bg-img.png)] bg-cover bg-center flex-col justify-between bg-black h-screen w-full">
    <div className="">
        <h1 className='text-4xl text-white font-semibold py-6 px-8'>Uber</h1>
    </div>
    <div className='bg-white w-full p-4'>
        <p className='font-bold text-start text-[1.8rem]'>
          Get started with Uber
        </p>
        <Link
        to='/user/login'
         className='bg-black px-4 flex justify-between items-center text-white w-full h-12 rounded-md mt-4 mx-auto mt-7 font-semibold active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer'
         >
          <p className=""></p>
          <span className='text-xl'>Continue</span>
          <FaArrowRight className=''/>
        </Link>
    </div>
   </div>
  )
}
