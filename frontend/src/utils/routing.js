import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Fetch directions from the backend /api/directions endpoint.
 * @param {number} originLat
 * @param {number} originLng
 * @param {number} destLat
 * @param {number} destLng
 * @param {string} token - JWT from localStorage
 * @returns {{ geometry, distance, duration, steps }}
 */
export const fetchDirections = async (originLat, originLng, destLat, destLng, token) => {
  if (!originLat || !originLng || !destLat || !destLng) {
    throw new Error("All four coordinate values are required.");
  }

  const response = await axios.get(`${BASE_URL}/directions`, {
    params: { originLat, originLng, destLat, destLng },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return response.data;
};

/**
 * Format distance (meters) to human-readable string.
 */
export const formatDistance = (meters) => {
  if (meters == null) return "—";
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Format duration (seconds) to human-readable string.
 */
export const formatDuration = (seconds) => {
  if (seconds == null) return "—";
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;
  return remaining > 0 ? `${hours} hr ${remaining} min` : `${hours} hr`;
};
