import React from 'react'
import { RiHome6Fill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";


export default function Rideing() {
  const location = useLocation();
  const rideData = location.state?.rideData;
  const vehicleType = rideData?.rider?.vehicle?.vehicleType;

  return (
    <div className='h-screen w-screen'>
        <img src="/map.png" alt="map" className="w-full z-10 h-[50%] object-cover" />
        <div className="flex justify-between items-center fixed top-0 left-0 w-full z-20 p-5">
                <img src="./logo.png" alt="car" className="w-20 h-full object-cover" />
            <Link to="/home" className="">
               <RiHome6Fill className='text-3xl'/>
            </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-[100%] h-[50%] bg-white shadow-xl z-20 p-5">

      {/* DRIVER + CAR HEADER */}
      <div className="flex items-center justify-between mb-5">

        {/* CAR IMAGE */}
        <img
          src={vehicleType === "car" ? "/car-logo.png" : vehicleType === "bike" ? "/bike-logo.png" : "/auto-logo.png"}
          alt="car"
          className={vehicleType === "car" ? "w-24" : vehicleType === "bike" ? "w-16" : "w-16"}
        />

        {/* DRIVER INFO */}
        <div className="text-right">
          <h4 className="font-semibold text-lg">{rideData?.rider?.fullName?.firstName} {rideData?.rider?.fullName?.lastName}</h4>
          <h2 className="font-bold text-xl">{rideData?.rider?.vehicle?.vehicleNumber}</h2>
          <p className="text-gray-500 text-sm">{rideData?.rider?.vehicle?.vehicleType}</p>
        </div>
      </div>


      {/* DROP OFF */}
      <div className="flex items-start gap-4 py-4 border-b">
        <FaMapMarkerAlt className="text-black mt-1" />
        <div>
          <h3 className="font-semibold">{rideData?.dropoffLocation}</h3>
          <p className="text-gray-500 text-sm">
            
          </p>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex items-start gap-4 py-4">
        <MdPayment className="text-black text-xl mt-1" />
        <div>
          <h3 className="font-semibold text-lg">৳{rideData?.price?.selected}</h3>
          <p className="text-gray-500 text-sm">Cash</p>
        </div>
      </div>

      <button className='w-full bg-black text-white py-3 rounded-lg'>Make a Payment</button>

    </div>

    </div>
  )
}
