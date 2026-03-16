import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function WaitingForRide({ rideData }) {

  const vehicleType = rideData?.rider?.vehicle?.vehicleType;
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Meet at pickup point</h1>
        <div className="flex items-center gap-2">
            <p className="bg-black text-white text-md px-4 py-2 rounded-lg font-semibold">OTP: {rideData?.otp}</p>
        </div>
      </div>

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


      {/* PICKUP */}
      <div className="flex items-start gap-4 py-4 border-b">
        <FaMapMarkerAlt className="text-black mt-1" />
        <div>
          <h3 className="font-semibold">{rideData?.pickupLocation}</h3>
          <p className="text-gray-500 text-sm">
            
          </p>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="flex items-start gap-4 py-4 border-b">
        <span className="text-xl font-bold">⊡</span>
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

    </div>
  );
}