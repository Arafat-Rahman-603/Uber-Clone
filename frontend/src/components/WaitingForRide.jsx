import React, { useEffect, useState, useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

export default function WaitingForRide({ rideData }) {

  const vehicleType = rideData?.rider?.vehicle?.vehicleType;
  const { socket } = useContext(SocketContext);

  const [riderLocation, setRiderLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [liveDistance, setLiveDistance] = useState(null);
  const [liveDuration, setLiveDuration] = useState(null);
  const [liveRoute, setLiveRoute] = useState(null);

  useEffect(() => {
    if (!rideData) return;

    // Set initial destination location for the map marker
    const fetchPickupLocation = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-coordinates?address=${rideData.pickupLocation}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (resp.data) setPickupLocation(resp.data);
        } catch (error) {
            console.error("Failed to load pickup coords", error);
        }
    };
    fetchPickupLocation();

    // Listen to live dot tracking
    const updateLocationListener = async (data) => {
        setRiderLocation(data);

        // Fetch live distance
        if (pickupLocation && data) {
            try {
                const resp = await axios.get(`${import.meta.env.VITE_API_URL}/maps/distance-coordinates`, {
                    params: {
                        originLat: data.lat, originLng: data.lng,
                        destLat: pickupLocation.lat, destLng: pickupLocation.lng
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (resp.data?.distance) {
                    setLiveDistance(resp.data.distance);
                    setLiveDuration(resp.data.duration);
                    setLiveRoute(resp.data.geometry);
                }
            } catch (error) {
                console.error("Could not calc live distance",error);
            }
        }
    };

    socket.on('rider-location-update', updateLocationListener);

    return () => {
        socket.off('rider-location-update', updateLocationListener);
    };
  }, [rideData, socket, pickupLocation]);

  return (
    <div className="h-full w-full relative">
      <div className="absolute inset-0 z-0 h-full">
          <LiveTracking riderLocation={riderLocation} targetLocation={pickupLocation} isRider={false} route={liveRoute} />
      </div>

    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-xl font-semibold">Meet at pickup point</h1>
            <p className="text-sm font-semibold text-gray-600">
                {liveDistance ? `${(liveDistance / 1000).toFixed(1)} km` : 'Calculating...'}
                {liveDuration ? ` • ${Math.round(liveDuration / 60)} min away` : ''}
            </p>
        </div>
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
    </div>
  );
}