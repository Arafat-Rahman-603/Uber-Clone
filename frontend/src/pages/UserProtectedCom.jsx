import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function UserProtectedCom({ children }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.user) {
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

    checkUser();
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
