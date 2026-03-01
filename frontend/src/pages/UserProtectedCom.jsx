import React from "react";
import { Navigate } from "react-router-dom";

export default function UserProtectedCom({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
}