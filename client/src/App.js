import LoginPage from "./pages/Login";
import { Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/signup";
import Vote from "./pages/VotePage";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VoterManagement from "./components/VoterManagement";
import NomineeManagement from "./components/NomineeManagement";
import Dashboard from "./components/Dashboard";
import AddNominee from "./components/AddNominee";

export const AppState = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3700); // Adjust the duration as needed
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={isLoading ? <Loader /> : <Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />

        <Route
          path="/vote"
          element={
            <ProtectedRoute requiredRole={["user", "admin"]}>
              {<Vote />}{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="voter-management" element={<VoterManagement />} />
          <Route path="nominee-management" element={<NomineeManagement />} />
          <Route path="add-nominee" element={<AddNominee />} />
        </Route>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
