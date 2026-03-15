import React, { useEffect } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";

export default function WaitingForDriverCon({setShowWaitingForDriver,setShowWaitingForRide,fareData,vehicleType}) {

  let price; 

  if(vehicleType === 'car'){
    price = fareData?.ride?.price.car;
  }else if(vehicleType === 'bike'){
    price = fareData?.ride?.price.bike;
  }else{
    price = fareData?.ride?.price.auto;
  }
  return (
        <div className="w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">
          <h1 className="text-2xl font-semibold mb-3">Waiting for driver accepting </h1>
        
        <div className="w-full h-1 bg-gray-200 overflow-hidden my-6">
          <div className="h-full bg-black animate-[loading_1s_linear_infinite]"></div>
        </div>

      {/* CAR IMAGE */}
      <div className="flex justify-center mb-6">
        <img
          src={vehicleType === "car" ? "/car-logo.png" : vehicleType === "bike" ? "/bike-logo.png" : "/auto-logo.png"}  // change path if needed
          alt="car"
          className={vehicleType === "car" ? "w-36" : vehicleType === "bike" ? "w-20" : "w-20"}
        />
      </div>

      {/* PICKUP */}
      <div className="flex items-center gap-4 py-4 border-b">
        <FaMapMarkerAlt className="text-black mt-1" />
        <div>
          <h3 className="font-semibold text-lg"></h3>
          <p className="text-gray-500 text-sm">
            {fareData?.ride?.pickupLocation}
          </p>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="flex items-center gap-4 py-4 border-b">
        <p className="text-xl font-bold ">⊡</p>
        <div>
          <h3 className="font-semibold text-lg"></h3>
          <p className="text-gray-500 text-sm">
            {fareData?.ride?.dropoffLocation}
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
