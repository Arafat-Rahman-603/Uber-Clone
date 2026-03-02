import React, { useEffect } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";

export default function WaitingForDriverCon({setShowWaitingForDriver,setShowWaitingForRide}) {

  return (
        <div className="w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">
          <h1 className="text-2xl font-semibold mb-3">Waiting for driver accepting </h1>
        
        <div className="w-full h-1 bg-gray-200 overflow-hidden my-6">
          <div className="h-full bg-black animate-[loading_1s_linear_infinite]"></div>
        </div>

      {/* CAR IMAGE */}
      <div className="flex justify-center mb-6">
        <img
          src="/car-logo.png"   // change path if needed
          alt="car"
          className="w-36"
        />
      </div>

      {/* PICKUP */}
      <div className="flex items-center gap-4 py-4 border-b">
        <FaMapMarkerAlt className="text-black mt-1" />
        <div>
          <h3 className="font-semibold text-lg">562/11-A</h3>
          <p className="text-gray-500 text-sm">
            Kaikondrahalli, Bengaluru, Karnataka
          </p>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="flex items-center gap-4 py-4 border-b">
        <p className="text-xl font-bold ">⊡</p>
        <div>
          <h3 className="font-semibold text-lg">Third Wave Coffee</h3>
          <p className="text-gray-500 text-sm">
            17th Cross Rd, PWD Quarters, 1st Sector,
            HSR Layout, Bengaluru, Karnataka
          </p>
        </div>
      </div>

    <style>
    {`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}
  </style>

    </div>

  )
}
