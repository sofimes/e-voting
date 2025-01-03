import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axios from "../utils/api";
function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const { setUser } = useContext(AppState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log("Server response:", response.data);
      const token = response.data.token;
      if (token) {
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data._id,
            role: response.data.role,
          })
        );
      }
      setUser({ id: response.data._id, role: response.data.role });

      alert("Login successful");

      if (response.data.role === "admin") {
        navigate("/admin-dashboard"); // Replace with actual admin route
      } else {
        navigate("/vote");
      }
    } catch (error) {
      console.error(
        error.response?.data?.error || "Login failed, please try again"
      );
      setErrorMessage(error.response?.data?.error || "Login failed");
    }
  };
  const handleFocus = () => {
    setErrorMessage("");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <form
        className="bg-transparent p-8 rounded-lg border-2 border-white shadow-xl shadow-cyan-500 animate-fall"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold text-white mb-2">
            Email
          </label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmailValue(e.target.value)}
            onFocus={handleFocus}
            className="border-2 border-gray-400 rounded-full w-full px-4 py-2 outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold text-white mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPasswordValue(e.target.value)}
            onFocus={handleFocus}
            className="border-2 border-gray-400 rounded-full w-full px-4 py-2 outline-none"
          />
        </div>
        {errorMessage && (
          <div className="text-red-700 text-center mb-4">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="bg-blue-500 mt-2 w-full rounded-full text-white border-2 border-white p-2 outline-none font-bold hover:bg-blue-600"
        >
          Log In
        </button>

        <div className="flex gap-2 mt-4 w-full  ">
          <p className="text-sm  text-white">Don't have an account? </p>
          <Link
            to="/signup"
            className="text-sm hover:underline text-gray-800 hover:text-hovermainColor"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
