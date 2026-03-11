import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    handleLogout();
  }

  const handleLogout = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  };

  return <div>UserLogout</div>;
}
