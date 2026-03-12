import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function LocationSearchPanel({
  suggestions,
  setPickup,
  setDestination,
  activeField
}) {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.name);
    } else if (activeField === 'destination') {
      setDestination(suggestion.name);
    }
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      {suggestions && suggestions.map((suggestion, index) => (
        <div
          onClick={() => handleSuggestionClick(suggestion)}
          key={index}
          className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <div className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full flex-shrink-0">
            <FaSearch className="text-gray-500" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium text-sm sm:text-base truncate">{suggestion.name.split(',')[0]}</p>
            <p className="text-xs text-gray-500 truncate">
              {suggestion.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
