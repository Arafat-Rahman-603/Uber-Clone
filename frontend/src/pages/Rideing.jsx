import React from 'react'
import { RiHome6Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";


export default function Rideing() {
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
          src="/car-logo.png"
          alt="car"
          className="w-24"
        />

        {/* DRIVER INFO */}
        <div className="text-right">
          <h4 className="font-semibold text-lg">Rakib</h4>
          <h2 className="font-bold text-xl">AC 4095 KP 873</h2>
          <p className="text-gray-500 text-sm">Toyota Corolla</p>
        </div>
      </div>


      {/* PICKUP */}
      <div className="flex items-start gap-4 py-4 border-b">
        <FaMapMarkerAlt className="text-black mt-1" />
        <div>
          <h3 className="font-semibold">562/11-A</h3>
          <p className="text-gray-500 text-sm">
            Kaikondrahalli, Bengaluru, Karnataka
          </p>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex items-start gap-4 py-4">
        <MdPayment className="text-black text-xl mt-1" />
        <div>
          <h3 className="font-semibold text-lg">৳120</h3>
          <p className="text-gray-500 text-sm">Cash</p>
        </div>
      </div>

      <button className='w-full bg-black text-white py-3 rounded-lg'>Make a Payment</button>

    </div>

    </div>
  )
}
