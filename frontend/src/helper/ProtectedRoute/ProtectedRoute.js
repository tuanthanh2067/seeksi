import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  } else if (token) {
    const decodedToken = jwt_decode(token);
    if (Date.now() >= decodedToken.exp * 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
