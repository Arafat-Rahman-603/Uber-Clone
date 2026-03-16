import React, { useEffect, useState, useContext } from 'react'
import { RiHome6Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';
import NavigationPanel from '../components/NavigationPanel';
import { fetchDirections } from '../utils/routing';


export default function Rideing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const rideData = location.state?.rideData;
  const vehicleType = rideData?.rider?.vehicle?.vehicleType;

  const [riderLocation, setRiderLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [liveDistance, setLiveDistance] = useState(null);
  const [liveDuration, setLiveDuration] = useState(null);
  const [liveRoute, setLiveRoute] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [navSteps, setNavSteps] = useState([]);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (!rideData) {
        navigate('/home');
        return;
    }

    // Set initial destination location for the map marker
    const fetchDestinationLocation = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-coordinates?address=${rideData.dropoffLocation}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (resp.data) setDestinationLocation(resp.data);
        } catch (error) {
            console.error("Failed to load dropoff coords", error);
        }
    };
    fetchDestinationLocation();

    const updateLocationListener = async (data) => {
        setRiderLocation(data);

        // Fetch full directions (geometry + steps)
        if (destinationLocation && data) {
            try {
                const dirs = await fetchDirections(
                    data.lat, data.lng,
                    destinationLocation.lat, destinationLocation.lng,
                    localStorage.getItem('token')
                );
                setLiveDistance(dirs.distance);
                setLiveDuration(dirs.duration);
                setLiveRoute(dirs.geometry);
                setNavSteps(dirs.steps || []);
            } catch (error) {
                console.error("Could not get directions", error);
            }
        }
    };

    socket.on('rider-location-update', updateLocationListener);
    socket.on('ride-ended', () => {
        setIsPaymentOpen(true);
    });

    return () => {
        socket.off('rider-location-update', updateLocationListener);
        socket.off('ride-ended');
    };
  }, [rideData, socket, destinationLocation, navigate]);

  const handleMakePayment = async () => {
      setIsProcessingPayment(true);
      
      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/pay`, {
              rideId: rideData._id
          }, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });

          if (response.status === 200) {
              setIsProcessingPayment(false);
              setIsPaymentOpen(false);
              setShowThankYou(true);
              
              setTimeout(() => {
                  navigate('/home');
              }, 3000);
          }
      } catch (error) {
          console.error("Error making payment:", error);
          setIsProcessingPayment(false);
      }
  };

  return (
    <div className='h-screen w-screen'>
      <div className="absolute inset-0 z-10 h-[50%]">
          <LiveTracking riderLocation={riderLocation} targetLocation={destinationLocation} isRider={false} route={liveRoute} />
          <NavigationPanel
            steps={navSteps}
            distance={liveDistance}
            duration={liveDuration}
            isVisible={showNav}
          />
          <button
            onClick={() => setShowNav(v => !v)}
            className="absolute top-3 right-3 z-40 bg-white/90 text-xs px-3 py-1.5 rounded-full shadow font-medium"
          >
            {showNav ? 'Hide Nav' : 'Show Nav'}
          </button>
      </div>
        <div className="flex justify-start items-center fixed top-0 left-0 w-full z-20 p-5">
                <img src="/logo.png" alt="car" className="w-20 h-full object-cover" />
        </div>

        <div className="absolute bottom-0 left-0 w-[100%] h-[50%] bg-white shadow-xl z-20 p-5">

      {/* DRIVER + CAR HEADER */}
      <div className="flex items-center justify-between mb-5">

        {/* CAR IMAGE */}
        <img
          src={vehicleType === "car" ? "/car-logo.png" : vehicleType === "bike" ? "/bike-logo.png" : "/auto-logo.png"}
          alt="car"
          className={vehicleType === "car" ? "w-24" : vehicleType === "bike" ? "w-16" : "w-16"}
        />

        {/* DRIVER INFO */}
        <div className="text-right">
          <h4 className="font-semibold text-lg">{rideData?.rider?.fullName?.firstName} {rideData?.rider?.fullName?.lastName}</h4>
          <h2 className="font-bold text-xl">{rideData?.rider?.vehicle?.vehicleNumber}</h2>
          <p className="text-gray-500 text-sm">
            {liveDistance ? (liveDistance / 1000).toFixed(1) : (rideData?.distance ? (rideData.distance / 1000).toFixed(1) : 0)} km 
            {liveDuration ? ` • ${Math.round(liveDuration / 60)} min` : ''}
          </p>
        </div>
      </div>


      {/* DROP OFF */}
      <div className="flex items-start gap-4 py-4 border-b">
        <FaMapMarkerAlt className="text-black mt-1" />
        <div>
          <h3 className="font-semibold">{rideData?.dropoffLocation}</h3>
          <p className="text-gray-500 text-sm">
            
          </p>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex items-start gap-4 py-4 mb-4">
        <MdPayment className="text-black text-xl mt-1" />
        <div>
          <h3 className="font-semibold text-lg">৳{rideData?.price?.selected}</h3>
          <p className="text-gray-500 text-sm">Cash</p>
        </div>
      </div>

    </div>

    {/* PAYMENT BOTTOM SHEET */}
    <div className={`absolute bottom-0 w-full bg-white shadow-2xl z-40 rounded-t-3xl transition-all duration-300 ${isPaymentOpen ? "h-[35%] py-6 px-5" : "h-0 overflow-hidden"}`}>
        <h2 className="text-2xl font-bold mb-2">Trip Completed!</h2>
        <p className="text-gray-500 mb-6">Your driver has reached the destination.</p>
        
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl mb-6">
            <span className="font-semibold text-lg text-gray-700">Total Fare</span>
            <span className="font-bold text-2xl">৳{rideData?.price?.selected}</span>
        </div>

        <button 
            onClick={handleMakePayment}
            disabled={isProcessingPayment}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-colors
                ${isProcessingPayment ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}
        >
            {isProcessingPayment ? "Processing Details..." : "Make Payment"}
        </button>
    </div>

    {/* THANK YOU OVERLAY */}
    {showThankYou && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-5 text-center px-8">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-2">
                    ✓
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
                <p className="text-gray-600 text-lg">Thank you for using our app. Redirecting to home...</p>
            </div>
        </div>
    )}

    </div>
  )
}
