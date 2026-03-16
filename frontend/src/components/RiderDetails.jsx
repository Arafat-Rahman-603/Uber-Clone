import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRiderStore } from '../../store/riderStore'

export default function RiderDetails() {
  const riderFromStore = useRiderStore((state) => state.rider);
  const rider = riderFromStore || JSON.parse(localStorage.getItem('rider') || '{}');

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/riders/stats`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load rider stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const vehicleLabel = rider?.vehicle?.vehicleType
    ? rider.vehicle.vehicleType.charAt(0).toUpperCase() + rider.vehicle.vehicleType.slice(1)
    : 'Vehicle';

  const statVal = (val) => (loadingStats ? '—' : val ?? '0');

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="absolute h-[35%] bottom-0 w-full bg-white shadow-2xl">

      {/* Profile + Earnings */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg uppercase flex-shrink-0">
              {rider?.fullName?.firstName?.[0] || '?'}{rider?.fullName?.lastName?.[0] || ''}
            </div>
            <div>
              <p className="font-semibold leading-tight">
                {rider?.fullName?.firstName} {rider?.fullName?.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {vehicleLabel} · {rider?.vehicle?.vehicleNumber || '—'}
                {rider?.vehicle?.color ? ` · ${rider.vehicle.color}` : ''}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">৳{statVal(stats?.todaysEarnings)}</p>
            <p className="text-gray-500 text-xs">Today's Earnings</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-gray-100 rounded-xl p-4 flex justify-between text-center mt-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-base">🚗</div>
            <p className="font-semibold text-sm">{statVal(stats?.todaysRides)}</p>
            <p className="text-xs text-gray-500">Today's Trips</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-base">📈</div>
            <p className="font-semibold text-sm">{statVal(stats?.totalRides)}</p>
            <p className="text-xs text-gray-500">Total Trips</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-base">💰</div>
            <p className="font-semibold text-sm">৳{statVal(stats?.totalEarnings)}</p>
            <p className="text-xs text-gray-500">Total Earned</p>
          </div>
        </div>

        {/* History Toggle */}
        {stats?.recentRides?.length > 0 && (
          <button
            onClick={() => setShowHistory(v => !v)}
            className="w-full text-center text-xs text-gray-500 mt-3 pb-1 underline"
          >
            {showHistory ? 'Hide Recent Rides ▲' : 'Show Recent Rides ▼'}
          </button>
        )}
      </div>

      {/* Recent Ride History */}
      {showHistory && stats?.recentRides?.length > 0 && (
        <div className="border-t divide-y max-h-52 overflow-y-auto">
          {stats.recentRides.map((ride, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-3 gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ride.pickupLocation}</p>
                <p className="text-xs text-gray-400 truncate">→ {ride.dropoffLocation}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(ride.completedAt)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-green-600">৳{ride.price}</p>
                <p className="text-xs text-gray-400">{ride.distance ? `${(ride.distance / 1000).toFixed(1)} km` : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
