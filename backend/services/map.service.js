import axios from "axios";

export const gateAddressCordinate = async (address) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "uber-clone-app"
      }
    }
  );

  const data = response.data;

  if (!data || data.length === 0) {
    throw new Error("Address not found");
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };
};

export const getDistanceTime = async (origin, destination) => {

  const response = await axios.get(
    `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`,
    {
      params: {
        overview: false
      }
    }
  );

  const data = response.data;

  if (!data.routes || data.routes.length === 0) {
    throw new Error("Route not found");
  }

  const route = data.routes[0];

  return {
    distance: route.distance,
    duration: route.duration
  };
};

export const searchPlaces = async (query) => {

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 5
      },
      headers: {
        "User-Agent": "uber-clone-app"
      }
    }
  );

  const data = response.data;

  return data.map(place => ({
    name: place.display_name,
    lat: place.lat,
    lng: place.lon
  }));
};