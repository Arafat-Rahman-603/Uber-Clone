import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function WaitingForRide() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Meet at pickup point</h1>
        <p className="bg-black text-white px-4 py-2 rounded-lg">2 min</p>
      </div>

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

      {/* DESTINATION */}
      <div className="flex items-start gap-4 py-4 border-b">
        <span className="text-xl font-bold">⊡</span>
        <div>
          <h3 className="font-semibold">Third Wave Coffee</h3>
          <p className="text-gray-500 text-sm">
            17th Cross Rd, PWD Quarters, 1st Sector,
            HSR Layout, Bengaluru, Karnataka
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

    </div>
  );
}