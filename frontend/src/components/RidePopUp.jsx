import React from 'react'
import { FiSearch } from "react-icons/fi";

export default function RidePopUp({ setRidePopUp, rideData }) {
  if (!rideData) return null;

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">
              {rideData.user?.fullName?.firstName} {rideData.user?.fullName?.lastName}
            </h2>
            <div className="flex gap-2 mt-1">
              <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded-full font-medium">
                Cash
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <h3 className="font-semibold text-2xl">৳{rideData.price?.selected}</h3>
          <p className="text-sm text-gray-500">
            {(rideData.distance / 1000).toFixed(1)} km
          </p>
        </div>
      </div>

      {/* Pickup Section */}
      <div className="mt-4">
        <p className="text-gray-400 text-xs font-semibold mb-1">PICK UP</p>
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm">{rideData.pickupLocation}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-3"></div>

      {/* Drop Off Section */}
      <div>
        <p className="text-gray-400 text-xs font-semibold mb-1">DROP OFF</p>
        <p className="font-medium text-sm">{rideData.dropoffLocation}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 items-center mt-5">
        <button
          onClick={() => setRidePopUp(false)}
          className="text-gray-400 font-medium hover:text-gray-600"
        >
          Ignore
        </button>
        <button
          onClick={() => setRidePopUp(false)}
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-xl font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
