import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import RideOption from "../components/RideOption";
import ConfirmedRide from "../components/ConfirmedRide";
import LocationSearchPanel from "../components/LocationSearchPanel";
import WaitingForDriverCon from "../components/WaitingForDriverCon";
import WaitingForRide from "../components/WaitingForRide";

export default function Home() {
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);

  const [openPanel, setOpenPanel] = useState(false);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [showConfirmedRide, setShowConfirmedRide] = useState(false);
  const [showWaitingForDriver, setShowWaitingForDriver] = useState(false);
  const [showWaitingForRide, setShowWaitingForRide] = useState(false);

  const closeAllPanels = () => {
    setShowRideOptions(false);
    setShowConfirmedRide(false);
    setShowWaitingForDriver(false);
    setShowWaitingForRide(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupRef.current.value || !destinationRef.current.value) return;

    setOpenPanel(false);
    closeAllPanels();
    setShowRideOptions(true);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-100">

      {/* MAP */}
      <img
        src="/map.png"
        alt="map"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* TOP BAR */}
      <div className="relative z-20 flex justify-between items-center p-5">
        <img src="/logo.png" alt="logo" className="w-20" />
        <img src="/profile.png" alt="profile" className="h-7" />
      </div>

      {/* FIND TRIP PANEL */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-20 transition-all duration-300
        ${openPanel ? "h-[85%]" : "h-36"}`}
      >
        {!openPanel ? (
          <div className="p-5 cursor-pointer" onClick={() => setOpenPanel(true)}>
            <h2 className="text-xl font-semibold mb-3">Find a trip</h2>
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-gray-500">Enter your destination</p>
            </div>
          </div>
        ) : (
          <div className="p-5 h-full flex flex-col relative">
            <IoIosArrowDown
              className="absolute top-5 right-5 text-xl cursor-pointer"
              onClick={() => setOpenPanel(false)}
            />

            <h2 className="text-xl font-semibold mb-4">Find a trip</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
              <input
                ref={pickupRef}
                type="text"
                placeholder="Enter pick-up location"
                className="bg-gray-100 rounded-lg p-3"
              />
              <input
                ref={destinationRef}
                type="text"
                placeholder="Enter destination"
                className="bg-gray-100 rounded-lg p-3"
              />
            </form>

            <LocationSearchPanel
              setOpenPanel={setOpenPanel}
              setShowRideOptions={setShowRideOptions}
            />
          </div>
        )}
      </div>

      {/* RIDE OPTIONS */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-30 transition-all duration-300 overflow-y-auto
        ${showRideOptions ? "h-[60%]" : "h-0"}`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Choose your ride</h2>
          <IoIosArrowDown
            className="cursor-pointer"
            onClick={() => {
              setShowRideOptions(false)
              setOpenPanel(true);
            }}
          />
        </div>

        <RideOption
          setShowRideOptions={setShowRideOptions}
          setShowConfirmedRide={setShowConfirmedRide}
        />
      </div>

      {/* CONFIRMED RIDE */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-40 transition-all duration-300 overflow-y-auto
        ${showConfirmedRide ? "h-[72%]" : "h-0"}`}
      >
        <IoIosArrowDown
          className="text-2xl text-center w-full cursor-pointer m-3"
          onClick={() => {
            setShowConfirmedRide(false);
            setShowRideOptions(true);
          }}
        />

        <ConfirmedRide
          setShowConfirmedRide={setShowConfirmedRide}
          setShowWaitingForDriver={setShowWaitingForDriver}
        />
      </div>

      {/* WAITING FOR DRIVER */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-40 transition-all duration-300 overflow-hidden
        ${showWaitingForDriver ? "h-[62%]" : "h-0 pointer-events-none"}`}
      >
        <WaitingForDriverCon
          setShowWaitingForDriver={setShowWaitingForDriver}
          setShowWaitingForRide={setShowWaitingForRide}
        />
      </div>

      {/* WAITING FOR RIDE */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-40 transition-all duration-300 overflow-hidden
        ${showWaitingForRide ? "h-[70%]" : "h-0 pointer-events-none"}`}
      >
        <WaitingForRide setShowWaitingForRide={setShowWaitingForRide} />
      </div>

    </div>
  );
}