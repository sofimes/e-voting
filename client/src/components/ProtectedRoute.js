// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import { AppState } from "../App";
// import axios from "../utils/api";

// function ProtectedRoute({ children, requiredRole }) {
//   const navigate = useNavigate();
//   const { user } = useContext(AppState);
//   const [authorized, setAuthorized] = useState(false); // Default to unauthorized

//   useEffect(() => {
//     const checkAuthorization = async () => {
//       const token = sessionStorage.getItem("jwt"); // Get JWT token from sessionStorage
//       const storedRole = sessionStorage.getItem("role");

//       if (!token || !storedRole) {
//         navigate("/login"); // Redirect to login if no token or role
//         return;
//       }

//       try {
//         // Verify the token and fetch user details
//         const res = await axios.get("/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.status === 200) {
//           const { role } = res.data;

//           if (Array.isArray(requiredRole)) {
//             if (requiredRole.includes(role)) {
//               setAuthorized(true); // User is authorized
//             } else {
//               setAuthorized(false);
//               navigate("/login");
//             }
//           } else if (role === requiredRole) {
//             setAuthorized(true); // User has the required role
//           } else {
//             setAuthorized(false);
//             navigate("/login");
//           }
//         }
//       } catch (error) {
//         setAuthorized(false);
//         navigate("/login");
//       }
//     };

//     checkAuthorization();
//   }, [requiredRole, navigate]);

//   if (authorized) {
//     return children; // Render the protected content if authorized
//   }

//   return <Navigate to="/login" />;
// }

// export default ProtectedRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { AppState } from "../App";

// const ProtectedRoute = ({ requiredRole, children }) => {
//   const { user } = React.useContext(AppState);

//   if (!user) {
//     // Redirect to login if the user is not authenticated
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && !requiredRole.includes(user.role)) {
//     // Redirect to home if the user's role does not match
//     return <Navigate to="/" />;
//   }

//   // If authenticated and role matches, render the children
//   return children;
// };

// export default ProtectedRoute;

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
