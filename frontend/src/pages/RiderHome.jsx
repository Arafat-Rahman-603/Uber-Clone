import React, { useState,useContext,useEffect } from 'react'
import axios from 'axios';
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom"
import RiderDetails from '../components/RiderDetails';
import RidePopUp from '../components/RidePopUp';
import GotoPickUp from '../components/GotoPickUp';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from "../context/SocketContext";


export default function RiderHome() {

  const { socket } = useContext(SocketContext);
  const [ ridePopUp , setRidePopUp ] = useState(false);
  const [ gotoPickUp , setGotoPickUp ] = useState(false);
  const [ rideData, setRideData ] = useState(null);
  const [ currentLocation, setCurrentLocation ] = useState(null);

  const userId =  JSON.parse(localStorage.getItem('rider'))._id;

  useEffect(() => {

  console.log(userId);
  if (!userId) return;

  socket.emit('join', {
    userType: 'rider',
    userId
  });

  let watchId;

  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCurrentLocation({ lat, lng });

      console.log("Sending location:", lat, lng);
                   
      socket.emit('update-location-rider', {
        userId: userId,
        location: { lat, lng }
      });

    }, (error) => {
      console.error("Location error:", error);
    }, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    });
  }


  socket.on("ride-request", (data) => {
    console.log("Ride request received:", data);
    setRideData(data);
    setRidePopUp(true);
  });

  return () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };

}, [userId]);
  const handleAcceptRide = async (rideInfo) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/accept`, {
        rideId: rideInfo._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Ride accepted:", response.data);
      
      setRideData(response.data);
      setRidePopUp(false);
      setGotoPickUp(true);
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  return (
      <div className="w-screen h-screen bg-gray-100 relative overflow-hidden rounded-xl shadow-xl">

      {/* MAP SECTION */}
      <div className="relative h-[65%] w-full">
        <div className="absolute inset-0 z-0">
          <LiveTracking riderLocation={currentLocation} isRider={true} />
        </div>

        {/* Uber Logo */}
        <div className="absolute top-0 w-full z-20 flex justify-between items-center p-5">
        <img src="/logo.png" alt="logo" className="w-20" />
        <Link to={"/rider/logout"} className='bg-white text-center p-2 rounded-full mb-2'>
        <TbLogout className='font-bold text-3xl'/>
        </Link>
      </div>

      </div>

      {/* BOTTOM SHEET */}
      <RiderDetails/>

      <div
        className={`my-5 mx-auto absolute bottom-0 left-[2.5%] w-[95%] bg-white rounded-3xl shadow-xl z-20 transition-all duration-300 overflow-hidden ${ridePopUp ? "h-[50%] p-4" : "h-[0%] p-0" } `}
      >
        <RidePopUp setRidePopUp={setRidePopUp} rideData={rideData} onAccept={handleAcceptRide}/>
      </div>

      <div
        className={`absolute bottom-0 w-[100%] bg-white z-40 transition-all duration-300 overflow-hidden ${gotoPickUp ? "h-[100%] p-0" : "h-[0%] p-0" } `}
      >
        <GotoPickUp setGotoPickUp={setGotoPickUp} rideData={rideData} />
      </div>
    </div>
  );


}
