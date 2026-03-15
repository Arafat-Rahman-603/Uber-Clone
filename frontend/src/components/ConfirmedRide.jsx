import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function ConfirmedRide({setShowConfirmedRide,setShowWaitingForDriver,fareData,vehicleType = "car"}) {

  const handleConfirmRide = () => {
    setShowConfirmedRide(false);
    setShowWaitingForDriver(true);
  }
  let price; 

  if(vehicleType === 'car'){
    price = fareData?.ride?.price.car;
  }else if(vehicleType === 'bike'){
    price = fareData?.ride?.price.bike;
  }else{
    price = fareData?.ride?.price.auto;
  }
  return (

    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">

      {/* CAR IMAGE */}
      <div className="flex justify-center mb-4">
        <img
          src={vehicleType === 'car' ? "/car-logo.png" : vehicleType === 'bike' ? "/bike-logo.png" : "/auto-logo.png"}   // change path if needed
          alt="car"
          className={vehicleType === 'car' ? "w-36" : vehicleType === 'bike' ? "h-20" : "w-20"}
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

      {/* PRICE */}
      <div className="flex items-start gap-4 py-4">
        <MdPayment className="text-black text-xl mt-1" />
        <div>
          <h3 className="font-semibold text-lg">৳{price}</h3>
          <p className="text-gray-500 text-sm">Cash Cash</p>
        </div>
      </div>

      <button
      onClick={handleConfirmRide}
      disabled={!vehicleType || !fareData}
      className="w-full bg-black text-white py-3 rounded-lg font-semibold"
      >
        Confirm Ride
      </button>

    </div>
  );
}