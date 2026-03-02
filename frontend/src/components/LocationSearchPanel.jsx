import React from 'react'
import { FaSearch } from 'react-icons/fa'


export default function LocationSearchPanel({setShowRideOptions,setOpenPanel}) {

 const location = [
  "Kempegowda International Airport",
  "Phoenix Marketcity",
  "Salarpuria Sattva Knowledge",
  "Sheraton Grand Bengaluru",
  "KSR Bengaluru City Junction"
 ];


  return (
    <div className="flex flex-col gap-4 overflow-y-auto">

              {location.map((place, index) => (
                <div
                  onClick={() => {setOpenPanel(false); setShowRideOptions(true)}}
                  key={index}
                  className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <FaSearch className="text-gray-500" />
                  <div>
                    <p className="font-medium">{place}</p>
                    <p className="text-sm text-gray-500">
                      Sample location address
                    </p>
                  </div>
                </div>
              ))}

            </div>
  )
}
