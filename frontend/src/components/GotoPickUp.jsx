import React, { useState, useEffect, useContext } from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';

export default function GotoPickUp({ setGotoPickUp, rideData }) {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const userId = JSON.parse(localStorage.getItem('rider'))?._id;

    const [currentLocation, setCurrentLocation] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [liveDistance, setLiveDistance] = useState(null);
    const [liveDuration, setLiveDuration] = useState(null);
    const [liveRoute, setLiveRoute] = useState(null);

    // Initial load: get pickup coordinates
    useEffect(() => {
        if (!rideData) return;

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
    }, [rideData]);

    // Live tracking
    useEffect(() => {
        if (!userId) return;

        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setCurrentLocation({ lat, lng });

                    // Broadcast to user while going to pickup
                    socket.emit('update-location-rider', {
                        userId: userId,
                        location: { lat, lng }
                    });

                    // Calculate live distance to pickup if we have it
                    if (pickupLocation) {
                        try {
                            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/maps/distance-coordinates`, {
                                params: {
                                    originLat: lat, originLng: lng,
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
                },
                (err) => console.log(err),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        }
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        }
    }, [userId, socket, pickupLocation]);

    const submitOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/start`, {
                rideId: rideData._id,
                otp: otp
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setGotoPickUp(false);
                navigate('/rider/rideing', { state: { rideData: response.data } });
            }
        } catch (error) {
            console.error("Error starting ride:", error);
            // Optionally set an error state here to display to the user
        }
    };

    return (
    <div className="mx-auto h-full bg-gray-100 flex flex-col justify-between relative">

      {/* Map Section */}
      <div className="absolute inset-x-0 top-0 h-[80%] z-0">
         <LiveTracking riderLocation={currentLocation} targetLocation={pickupLocation} isRider={true} route={liveRoute} />
      </div>

      {/* Top Content (Transparent pad for absolute map) */}
      <div className="h-[40%] pointer-events-none"></div>

      <div className="bg-white rounded-t-3xl shadow-md p-4 z-10 flex-grow flex flex-col justify-between">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
        <RiLogoutBoxLine onClick={()=>setGotoPickUp(false)} className='text-xl font-bold'/>
          <h2 className="font-semibold">#123456</h2>
          <div></div>
        </div>

        {/* User Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{rideData?.user?.fullName?.firstName} {rideData?.user?.fullName?.lastName}</h3>
              <div className="flex gap-2 mt-1">
                <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  Cash
                </span>
                <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded-full font-medium">
                  Discount
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <h3 className="font-semibold text-xl">৳{rideData?.price?.[rideData?.vehicleType] || rideData?.price?.selected}</h3>
            <p className="text-sm text-gray-500">
                {liveDistance ? (liveDistance / 1000).toFixed(1) : (rideData?.distance ? (rideData.distance / 1000).toFixed(1) : 0)} km
                {liveDuration ? ` • ${Math.round(liveDuration / 60)} min` : ''}
            </p>
          </div>
        </div>

        {/* Pickup */}
        <div className="mb-3">
          <p className="text-gray-400 text-xs font-semibold">PICK UP</p>
          <div className="flex justify-between items-center">
            <p className="font-medium">{rideData?.pickupLocation}</p>
          </div>
        </div>

        {/* Drop Off */}
        <div className="mb-3">
          <p className="text-gray-400 text-xs font-semibold">DROP OFF</p>
          <p className="font-medium">{rideData?.dropoffLocation}</p>
        </div>

        {/* OTP SCTION */}

        <form onSubmit={submitOtp}>
            <input type="text" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border-2 border-gray-400 rounded-md p-2 w-full h-12 my-4 mx-auto font-semibold text-center" 
            placeholder='Enter OTP'
            />
        </form>

        {/* Fare Details */}
        <div className="border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <p>Cash</p>
            <p>৳{rideData?.price?.[rideData?.vehicleType] || rideData?.price?.selected}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>৳0.00</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Paid amount</p>
            <p>৳{rideData?.price?.[rideData?.vehicleType] || rideData?.price?.selected}</p>
          </div>
        </div>

        {/* Action Buttons */}
        

      </div>

      {/* Bottom Button */}
      <div className="p-4">
        <button
         onClick={submitOtp}
         className="w-full block text-center bg-yellow-400 hover:bg-yellow-500 py-3 rounded-2xl font-semibold">
          START RIDE
        </button>
      </div>

    </div>
  );
}