import React from 'react'

export default function RideOption({setShowRideOptions,setShowConfirmedRide, fareData, setVehicleType}) {

    const handleSelect = (type) => {
        setVehicleType(type);
        setShowRideOptions(false);
        setShowConfirmedRide(true);
    }

  return (
    <div className=''>
      <div className='flex justify-between items-center w-screen py-4 my-1 px-4'
        onClick={() => handleSelect('car')}>
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
            <p className="text-sm text-gray-600">Comfortable and affordable</p>
        </div>
        <h2 className="font-semibold text-2xl self-start">৳{fareData?.ride?.price.car || 0}</h2>
      </div>

      <div className='flex justify-between items-center w-screen py-4 my-1 px-4'
        onClick={() => handleSelect('bike')}>
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
            <p className="text-sm text-gray-600">Fast and convenient</p>
        </div>
        <h2 className="font-semibold text-2xl self-start">৳{fareData?.ride?.price.bike || 0}</h2>
      </div>

      <div className='flex justify-between items-center w-screen py-4 my-1 px-4'
        onClick={() => handleSelect('auto')}>
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
            <p className="text-sm text-gray-600">Perfect for daily traffic</p>
        </div>
        <h2 className="font-semibold text-2xl self-start">৳{fareData?.ride?.price.auto || 0}</h2>
      </div>
    </div>
  )
}
