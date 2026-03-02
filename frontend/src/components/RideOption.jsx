import React from 'react'

export default function RideOption({setShowRideOptions,setShowConfirmedRide}) {

    const rideOptions = [
        {
            name: "UberX",
            image: "./car-logo.png",
            passengers: 4,
            time: "3 min away",
            description: "Comfortable and affordable",
            price: "৳120"
        },
        {
            name: "UberX",
            image: "./car-logo.png",
            passengers: 4,
            time: "3 min away",
            description: "Comfortable and affordable",
            price: "৳120"
        },
        {
            name: "UberX",
            image: "./car-logo.png",
            passengers: 4,
            time: "3 min away",
            description: "Comfortable and affordable",
            price: "৳120"
        },
        {
            name: "UberX",
            image: "./car-logo.png",
            passengers: 4,
            time: "3 min away",
            description: "Comfortable and affordable",
            price: "৳120"
        },
        {
            name: "UberX",
            image: "./car-logo.png",
            passengers: 4,
            time: "3 min away",
            description: "Comfortable and affordable",
            price: "৳80"
        },
        {
            name: "UberX",
            image: "./car-logo.png",
            passengers: 4,
            time: "3 min away",
            description: "Comfortable and affordable",
            price: "৳120"
        },
    ]


  return (
    <div className=''>
{    rideOptions.map((rideOption, index) => (
    <div className='flex justify-between items-center w-screen py-4 my-1 px-4'
    onClick={() => {setShowRideOptions(false); setShowConfirmedRide(true);}}
     key={index}>
        <img src="./car-logo.png" alt="" className="h-12" />
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[1.3rem]">{rideOption.name}</h2>
                <div className="flex items-center gap-1">
                    <img src="./profile.png" alt="" className="h-4" />
                    <p className="text-lg font-medium">· {rideOption.passengers}</p>
                </div>
            </div>
            <h4 className="font-medium text-md">{rideOption.time}</h4>
            <p className="text-sm text-gray-600">{rideOption.description}</p>
        </div>
        <h2 className="font-semibold text-2xl self-start">{rideOption.price}</h2>
    </div>
))}
    </div>
  )
}
