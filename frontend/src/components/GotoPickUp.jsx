import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function GotoPickUp(
    {setGotoPickUp}
) {
  

    return (
    <div className="mx-auto h-screen bg-gray-100 flex flex-col justify-between">


      {/* Top Content */}
      <div className="bg-white rounded-b-3xl shadow-md p-4">

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
              <h3 className="font-semibold">Esther Berry</h3>
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
            <h3 className="font-semibold text-xl">৳25.00</h3>
            <p className="text-sm text-gray-500">2.2 km</p>
          </div>
        </div>

        {/* Pickup */}
        <div className="mb-3">
          <p className="text-gray-400 text-xs font-semibold">PICK UP</p>
          <div className="flex justify-between items-center">
            <p className="font-medium">7958 Swift Village</p>
          </div>
        </div>

        {/* Drop Off */}
        <div className="mb-3">
          <p className="text-gray-400 text-xs font-semibold">DROP OFF</p>
          <p className="font-medium">105 William St, Chicago, US</p>
        </div>

        {/* OTP SCTION */}

        <form action="">
            <input type="text" 
            className="border-2 border-gray-400 rounded-md p-2 w-full h-12 my-4 mx-auto font-semibold text-center" 
            placeholder='Enter OTP'
            />
        </form>

        {/* Fare Details */}
        <div className="border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <p>Cash</p>
            <p>৳15.00</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>৳10.00</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Paid amount</p>
            <p>৳25.00</p>
          </div>
        </div>

        {/* Action Buttons */}
        

      </div>

      {/* Bottom Button */}
      <div className="p-4">
        <Link to={"/rider/rideing"}
         onClick={()=>setGotoPickUp(false)}
         className="w-full block text-center bg-yellow-400 hover:bg-yellow-500 py-3 rounded-2xl font-semibold">
          GO TO PICK UP
        </Link>
      </div>

    </div>
  );
}