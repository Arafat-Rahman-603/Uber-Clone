import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons (optional but good for distinguishing rider vs target)
const riderIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const targetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


// Helper component to auto-pan the map when the rider moves
const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            // Optional: You could use flyTo instead of zoom if panning often
            map.flyTo([lat, lng], map.getZoom(), { animate: true, duration: 1.5 });
        }
    }, [lat, lng, map]);
    return null;
}

export default function LiveTracking({ riderLocation, targetLocation, isRider, route }) {

    // Default to a central location (e.g., Bangalore or user's last known) if nothing provided yet
    const defaultCenter = [12.9716, 77.5946]; 
    
    // We base the center primarily on the rider's live location
    const center = riderLocation && riderLocation.lat && riderLocation.lng 
        ? [riderLocation.lat, riderLocation.lng] 
        : defaultCenter;

    // Convert GeoJSON route [lng, lat] to Leaflet polyline [lat, lng]
    const polylinePositions = route ? route.map(point => [point[1], point[0]]) : [];

    return (
        <MapContainer 
            center={center} 
            zoom={15} 
            scrollWheelZoom={false}
            zoomControl={false}
            className="w-full h-full z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Auto pan container */}
            <RecenterMap lat={center[0]} lng={center[1]} />

            {/* Rider Marker (Red) */}
            {riderLocation && riderLocation.lat && riderLocation.lng && (
                <Marker position={[riderLocation.lat, riderLocation.lng]} icon={riderIcon}>
                    <Popup>
                        {isRider ? "You are here" : "Driver is here"}
                    </Popup>
                </Marker>
            )}

            {/* Target/Destination Marker (Blue) */}
            {targetLocation && targetLocation.lat && targetLocation.lng && (
                <Marker position={[targetLocation.lat, targetLocation.lng]} icon={targetIcon}>
                    <Popup>
                        Destination
                    </Popup>
                </Marker>
            )}

            {/* Route Polyline */}
            {polylinePositions.length > 0 && (
                <Polyline positions={polylinePositions} color="blue" weight={5} opacity={0.7} />
            )}

        </MapContainer>
    )
}
