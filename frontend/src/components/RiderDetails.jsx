import React from 'react'
import { useRiderStore } from '../../store/riderStore'

export default function RiderDetails() {
  let riderData;
  const rider = useRiderStore((state) => state.rider);

  if(!rider){
    riderData = JSON.parse(localStorage.getItem("rider"));
  }else{
    riderData = rider;
  }
  
  return (
    <div className="absolute h-[35%] bottom-0 w-full bg-white p-5 shadow-2xl">

        {/* Profile Section */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">
                {riderData.fullName.firstName} {riderData.fullName.lastName}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold">৳295</p>
            <p className="text-gray-500 text-sm">Earned</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-100 rounded-xl p-4 flex justify-between text-center mt-6">

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow mb-1">
              ⏱
            </div>
            <p className="font-semibold">10.2</p>
            <p className="text-xs text-gray-500">Hours Online</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow mb-1">
              📈
            </div>
            <p className="font-semibold">10.2</p>
            <p className="text-xs text-gray-500">Hours Online</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow mb-1">
              📊
            </div>
            <p className="font-semibold">10.2</p>
            <p className="text-xs text-gray-500">Hours Online</p>
          </div>

        </div>
      </div>
  )
}
