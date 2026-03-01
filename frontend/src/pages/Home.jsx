import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import RideOption from "../components/RideOption";
import LocationSearchPanel from "../components/LocationSearchPanel";

export default function Home() {
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const [openPanel, setOpenPanel] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pickupRef.current.value);
    console.log(destinationRef.current.value);
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-100">

      {/* MAP BACKGROUND */}
      <img
        src="/map.png"   // use your map image here
        alt="map"
        className="absolute w-full h-full object-cover"
      />

      {/* TOP BAR */}
      <div className="relative z-10 flex justify-between items-center p-5">
        <img src="/logo.png" alt="logo" className="w-20" />
        <img src="/profile.png" alt="profile" className="h-7" />
      </div>

      {/* BOTTOM PANEL */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 transition-all duration-300
        ${openPanel ? "h-[85%]" : "h-36"}`}
      >
        {/* COLLAPSED VIEW */}
        {!openPanel && (
          <div
            className="p-5 cursor-pointer"
            onClick={() => setOpenPanel(true)}
          >
            <h2 className="text-xl font-semibold mb-3">Find a trip</h2>

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-gray-500">Enter your destination</p>
            </div>
          </div>
        )}

        {/* EXPANDED VIEW */}
        {openPanel && (
          <div className="p-5 h-full flex flex-col relative">
            
            {/* HEADER */}
            <h2 className="text-xl font-semibold mb-3">Find a trip</h2>
            <div className="flex items-center gap-4 mb-5">
              <IoIosArrowDown
                className="cursor-pointer absolute top-8 right-4 -translate-x-1/2 -translate-y-1/2"
                onClick={() => setOpenPanel(false)}
              />
              <form className="flex-1 flex flex-col gap-4 relative" onSubmit={handleSubmit}>
                <div 
                className="line z-50 absolute top-1/2 right-4 -translate-x-1/2 -translate-y-1/2 h-12 w-1 bg-gray-600 rounded-full"
                ></div>
                  <input 
                  type="text" 
                  placeholder="Enter your pick-up location" 
                  className="text-gray-500 bg-gray-100 rounded-lg p-3" 
                  ref={pickupRef}
                  />
                  <input 
                  type="text" 
                  placeholder="Enter your destination" 
                  className="text-gray-500 bg-gray-100 rounded-lg p-3" 
                  ref={destinationRef}
                  />
              </form>
            </div>

            {/* DESTINATION LIST */}
            <LocationSearchPanel className="flex flex-col gap-4 overflow-y-auto"/>
          </div>
        )}
      </div>

      {/* RIDE OPTIONS */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] overflow-y-auto bg-white rounded-t-3xl shadow-xl z-20 transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-3 pt-6 px-4">Choose your ride</h2>
        <RideOption />
      </div>
      
    </div>
  );
}