import React, { useState,useContext,useEffect } from 'react'
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom"
import RiderDetails from '../components/RiderDetails';
import RidePopUp from '../components/RidePopUp';
import GotoPickUp from '../components/GotoPickUp';
import { SocketContext } from "../context/SocketContext";


export default function RiderHome() {

  const { socket } = useContext(SocketContext);
  const [ ridePopUp , setRidePopUp ] = useState(true);
  const [ gotoPickUp , setGotoPickUp ] = useState(true);

  const userId =  JSON.parse(localStorage.getItem('rider'))._id;
  useEffect(() => {

  console.log(userId)
  if (!userId) return;

  socket.emit('join', {
    userType: 'rider',
    userId
  });

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("Sending location:", position.coords.latitude, position.coords.longitude);
        socket.emit('update-location-rider', {
          userId: userId,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };

  const locationInterval = setInterval(updateLocation, 15000);
  updateLocation();

  return () => clearInterval(locationInterval);

}, [userId]);


  return (
      <div className="w-screen h-screen bg-gray-100 relative overflow-hidden rounded-xl shadow-xl">

      {/* MAP SECTION */}
      <div className="relative h-[65%] w-full">
        <img
          src="/map.png"
          alt="map"
          className="w-full h-full object-cover"
        />

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
        className={`my-5 mx-auto absolute bottom-0 left-[2.5%] w-[95%] bg-white rounded-3xl shadow-xl z-20 transition-all duration-300 overflow-hidden ${ridePopUp ? "h-[40%] p-4" : "h-[0%] p-0" } `}
      >
        <RidePopUp setRidePopUp={setRidePopUp}/>
      </div>

      <div
        className={`absolute bottom-0 w-[100%] bg-white z-40 transition-all duration-300 overflow-hidden ${gotoPickUp ? "h-[100%] p-0" : "h-[0%] p-0" } `}
      >
        <GotoPickUp setGotoPickUp={setGotoPickUp} />
      </div>
    </div>
  );


}
