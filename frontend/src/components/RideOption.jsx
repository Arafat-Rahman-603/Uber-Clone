import React from 'react'

export default function RideOption({setShowRideOptions, setShowConfirmedRide, fareData, setVehicleType, availableVehicles}) {

    const handleSelect = (type) => {
        // Only allow selection if this vehicle type is available
        if (availableVehicles && !availableVehicles[type]) return;
        setVehicleType(type);
        setShowRideOptions(false);
        setShowConfirmedRide(true);
    }

  return (
    <div className=''>
      {/* CAR OPTION */}
      <div
        className={`flex justify-between items-center w-screen py-4 my-1 px-4 transition-opacity ${
          availableVehicles && !availableVehicles.car ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleSelect('car')}
      >
        <img src="/car-logo.png" alt="" className="h-12" />
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[1.3rem]">UberX</h2>
                <div className="flex items-center gap-1">
                    <img src="/profile.png" alt="" className="h-4" />
                    <p className="text-lg font-medium">· 4</p>
                </div>
            </div>
            <h4 className="font-medium text-md">{fareData?.ride?.duration ? Math.ceil(fareData.ride.duration / 60) + ' mins away' : 'Loading...'}</h4>
            <p className="text-sm text-gray-600">
              {availableVehicles && !availableVehicles.car ? 'No riders nearby' : 'Comfortable and affordable'}
            </p>
        </div>
        <h2 className="font-semibold text-2xl self-start">৳{fareData?.ride?.price.car || 0}</h2>
      </div>

      {/* BIKE OPTION */}
      <div
        className={`flex justify-between items-center w-screen py-4 my-1 px-4 transition-opacity ${
          availableVehicles && !availableVehicles.bike ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleSelect('bike')}
      >
        <img src="/bike-logo.png" alt="" className="h-12" />
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[1.3rem]">Moto</h2>
                <div className="flex items-center gap-1">
                    <img src="/profile.png" alt="" className="h-4" />
                    <p className="text-lg font-medium">· 1</p>
                </div>
            </div>
            <h4 className="font-medium text-md">{fareData?.ride?.duration ? Math.ceil(fareData.ride.duration / 60) + ' mins away' : 'Loading...'}</h4>
            <p className="text-sm text-gray-600">
              {availableVehicles && !availableVehicles.bike ? 'No riders nearby' : 'Fast and convenient'}
            </p>
        </div>
        <h2 className="font-semibold text-2xl self-start">৳{fareData?.ride?.price.bike || 0}</h2>
      </div>

      {/* AUTO OPTION */}
      <div
        className={`flex justify-between items-center w-screen py-4 my-1 px-4 transition-opacity ${
          availableVehicles && !availableVehicles.auto ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleSelect('auto')}
      >
        <img src="/auto-logo.png" alt="" className="h-12" />
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[1.3rem]">UberAuto</h2>
                <div className="flex items-center gap-1">
                    <img src="/profile.png" alt="" className="h-4" />
                    <p className="text-lg font-medium">· 3</p>
                </div>
            </div>
            <h4 className="font-medium text-md">{fareData?.ride?.duration ? Math.ceil(fareData.ride.duration / 60) + ' mins away' : 'Loading...'}</h4>
            <p className="text-sm text-gray-600">
              {availableVehicles && !availableVehicles.auto ? 'No riders nearby' : 'Perfect for daily traffic'}
            </p>
        </div>
        <h2 className="font-semibold text-2xl self-start">৳{fareData?.ride?.price.auto || 0}</h2>
      </div>
    </div>
  )
}
