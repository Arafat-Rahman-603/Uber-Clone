import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import axios from 'axios';

export default function FinishRide(
    {rideData, vehicleType, isWaitingForPayment, setIsWaitingForPayment}
) {

    const handleCompleteRide = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/end`, {
                rideId: rideData._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                // Don't hide the sheet, let the rider wait for user payment
                setIsWaitingForPayment(true);
            }
        } catch (error) {
            console.error("Error ending ride:", error);
        }
    };

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
          <h3 className="font-semibold text-lg">{rideData?.pickupLocation}</h3>
          <p className="text-gray-500 text-sm">
            
          </p>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="flex items-center gap-4 py-4 border-b">
        <p className="text-xl font-bold ">⊡</p>
        <div>
          <h3 className="font-semibold text-lg">{rideData?.dropoffLocation}</h3>
          <p className="text-gray-500 text-sm">
            
          </p>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex items-start gap-4 py-4">
        <MdPayment className="text-black text-xl mt-1" />
        <div>
          <h3 className="font-semibold text-lg">৳{rideData?.price?.[vehicleType] || rideData?.price?.selected}</h3>
          <p className="text-gray-500 text-sm">Cash</p>
        </div>
      </div>

      {isWaitingForPayment ? (
          <div className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold text-center flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-4 border-gray-400 border-t-gray-700 rounded-full animate-spin"></div>
            Waiting for User to make payment...
          </div>
      ) : (
          <button
          onClick={handleCompleteRide}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            Compelete Ride
          </button>
      )}

    </div>
  );
}
