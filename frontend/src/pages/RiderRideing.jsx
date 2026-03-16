import React, { useState, useEffect, useContext } from 'react'
import { TbLogout } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';

export default function RiderRideing() {

    const [compeleteRide, setCompeleteRide ] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const rideData = location.state?.rideData;
    
    const { socket } = useContext(SocketContext);
    const userId = JSON.parse(localStorage.getItem('rider'))?._id;

    const [currentLocation, setCurrentLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [liveDistance, setLiveDistance] = useState(null);
    const [liveDuration, setLiveDuration] = useState(null);
    const [liveRoute, setLiveRoute] = useState(null);
    const [isWaitingForPayment, setIsWaitingForPayment] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    // Initial load effects
    useEffect(() => {
        if (!rideData) return;

        const fetchDestinationLocation = async () => {
            try {
                const resp = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-coordinates?address=${rideData.dropoffLocation}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (resp.data) setDestinationLocation(resp.data);
            } catch (error) {
                console.error("Failed to load dropoff coords", error);
            }
        };
        fetchDestinationLocation();
    }, [rideData]);

    // Live location tracking and socket emitting
    useEffect(() => {
        if (!userId) return;

        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setCurrentLocation({ lat, lng });

                    // Broadcast to user
                    socket.emit('update-location-rider', {
                        userId: userId,
                        location: { lat, lng }
                    });

                    // Calculate live distance if we have target
                    if (destinationLocation) {
                        try {
                            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/maps/distance-coordinates`, {
                                params: {
                                    originLat: lat, originLng: lng,
                                    destLat: destinationLocation.lat, destLng: destinationLocation.lng
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
    }, [userId, socket, destinationLocation]);

    useEffect(() => {
        socket.on('payment-received', () => {
            // Hide the bottom sheet complete section
            setCompeleteRide(false);
            // Hide the waiting loader
            setIsWaitingForPayment(false);
            // Show the Thank you overlay
            setShowThankYou(true);
            
            // Navigate away after 3 seconds
            setTimeout(() => {
                if(navigate) navigate('/rider/home');
            }, 3000);
        });

        return () => {
            socket.off('payment-received');
        }
    }, [socket, navigate]);


  return (
    <div className="w-screen h-screen bg-gray-100 relative overflow-hidden rounded-xl shadow-xl">

      {/* MAP SECTION */}
      <div className="relative h-[80%] w-full">
        <div className="absolute inset-0 z-0">
            <LiveTracking riderLocation={currentLocation} targetLocation={destinationLocation} isRider={true} route={liveRoute} />
        </div>

        {/* Uber Logo */}
        <div className="absolute top-0 w-full z-20 flex justify-start items-center p-5">
        <img src="/logo.png" alt="logo" className="w-20" />
      </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">

  {/* Container */}
  <div className="bg-yellow-500 backdrop-blur-md shadow-2xl px-6 py-5 flex justify-between items-center">

    {/* Distance Section */}
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center 
                      text-2xl font-bold text-black 
                      bg-gradient-to-br from-white to-white/50 
                      rounded-full shadow-lg">
        {liveDistance ? (liveDistance / 1000).toFixed(1) : (rideData?.distance ? (rideData.distance / 1000).toFixed(1) : 0)} 
        <span className="text-xs ml-1 mt-1">KM</span>
      </div>
      <p className="mt-2 text-sm font-bold tracking-wider text-white">
        {liveDuration ? `${Math.round(liveDuration / 60)} MIN` : 'FAR'} 
      </p>
    </div>

    {/* Complete Button */}
    <button 
    onClick={()=>setCompeleteRide(true)}
    className="bg-gradient-to-r from-white/50 to-white hover:from-white hover:to-white/50 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl">
      Complete Ride
    </button>

  </div>
</div>


<div
    className={`absolute bottom-0 w-[100%] bg-white z-40 transition-all duration-300 overflow-hidden ${compeleteRide ? "h-[80%] p-0" : "h-[0%] p-0" } `}
>
        <FinishRide 
            rideData={rideData} 
            vehicleType={rideData?.vehicleType} 
            isWaitingForPayment={isWaitingForPayment}
            setIsWaitingForPayment={setIsWaitingForPayment}
        />
</div>

    {/* THANK YOU OVERLAY */}
    {showThankYou && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-5 text-center px-8">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-2">
                    ✓
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Payment Received!</h2>
                <p className="text-gray-600 text-lg">Thank you for using our app to drive safely. Redirecting to home...</p>
            </div>
        </div>
    )}

</div>
  )
}
