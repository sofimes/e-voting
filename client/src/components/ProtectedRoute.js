import React from "react";
import { Navigate } from "react-router-dom";
import { AppState } from "../App";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user } = React.useContext(AppState);

  if (!user) {
    console.log("User not authenticated. Redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    // Ensure `requiredRole` is an array for consistent checking
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      console.log(
        `Access denied. User role "${
          user.role
        }" does not match required roles: ${roles.join(", ")}`
      );
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
