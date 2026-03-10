import React, { useState } from 'react'
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';

export default function RiderRideing() {

    const [compeleteRide, setCompeleteRide ] = useState(false)


  return (
    <div className="w-screen h-screen bg-gray-100 relative overflow-hidden rounded-xl shadow-xl">

      {/* MAP SECTION */}
      <div className="relative h-[80%] w-full">
        <img
          src="/map.png"
          alt="map"
          className="w-full h-full object-cover"
        />

        {/* Uber Logo */}
        <div className="absolute top-0 w-full z-20 flex justify-start items-center p-5">
        <img src="/logo.png" alt="logo" className="w-20" />
      </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">

  {/* Container */}
  <div className="bg-yellow-500 backdrop-blur-md shadow-2xl px-6 py-5 flex justify-between items-center">

    {/* Distance Section */}
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center 
                      text-2xl font-bold text-black 
                      bg-gradient-to-br from-white to-white/50 
                      rounded-full shadow-lg">
        4 KM
      </div>
      <p className="mt-2 text-sm font-bold tracking-wider text-white">
        AWAY
      </p>
    </div>

    {/* Complete Button */}
    <button 
    onClick={()=>setCompeleteRide(true)}
    className="bg-gradient-to-r from-white/50 to-white hover:from-white hover:to-white/50 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl">
      Complete Ride
    </button>

  </div>
</div>


<div
    className={`absolute bottom-0 w-[100%] bg-white z-40 transition-all duration-300 overflow-hidden ${compeleteRide ? "h-[100%] p-0" : "h-[0%] p-0" } `}
>
        <FinishRide setCompeleteRide={setCompeleteRide} />
</div>


</div>
  )
}
