import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function FinishRide(
    {setCompeleteRide, rideData, vehicleType}
) {

    return (
    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">

      {/* CAR IMAGE */}
      <div className="flex justify-center mb-4">
        <img
          src={vehicleType === "car" ? "/car-logo.png" : vehicleType === "bike" ? "/bike-logo.png" : "/auto-logo.png"}   // change path if needed
          alt="car"
          className={vehicleType === "car" ? "w-36" : vehicleType === "bike" ? "w-24" : "w-24"}
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

      {/* PRICE */}
      <div className="flex items-start gap-4 py-4">
        <MdPayment className="text-black text-xl mt-1" />
        <div>
          <h3 className="font-semibold text-lg">৳120</h3>
          <p className="text-gray-500 text-sm">Cash Cash</p>
        </div>
      </div>

      <button
      onClick={() => {setCompeleteRide(false);}}
      className="w-full bg-black text-white py-3 rounded-lg font-semibold"
      >
        Compelete Ride
      </button>

    </div>
  );
}
