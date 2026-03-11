import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RiderProtectedCom({ children }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkRider = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/riders/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.rider) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.log("Unauthorized:", error.response?.data);
        setIsAuthorized(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkRider();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-[#EBBE4D] border-t-black rounded-full animate-spin"></div>
      </div>
    );

  if (!token || !isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
