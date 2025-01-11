import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axios from "../utils/api";
function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [fullName, setFullNameValue] = useState("");
  const [age, setAgeValue] = useState("");
  const [gender, setGenderValue] = useState("");
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const { setUser } = useContext(AppState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !age || !gender || !email || !password) {
      setErrorMessage("please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post("/auth/signup", {
        fullName,
        age,
        gender,
        email,
        password,
      });
      const token = response.data.token;
      const user = {
        _id: response.data._id,
        role: response.data.role,
      };
      sessionStorage.setItem("jwt", token);

      sessionStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(
        error.response?.data?.error || "Registration failed, please try again"
      );
      setErrorMessage(error.response?.data?.error || "Registration failed");
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
            Full name
          </label>
          <input
            type="text"
            id="username"
            value={fullName}
            onChange={(e) => setFullNameValue(e.target.value)}
            onFocus={handleFocus}
            className="border-2 border-gray-400 rounded-full w-full px-4 py-2 outline-none"
          />
        </div>
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
          <label htmlFor="username" className="block font-bold text-white mb-2">
            Age
          </label>
          <input
            type="text"
            id="username"
            value={age}
            onChange={(e) => setAgeValue(e.target.value)}
            onFocus={handleFocus}
            className="border-2 border-gray-400 rounded-full w-full px-4 py-2 outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block font-bold text-white mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGenderValue(e.target.value)}
            onFocus={handleFocus}
            className="border-2 border-gray-400 rounded-full w-full px-4 py-2 outline-none"
          >
            <option value="" className="text-gray-400">
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
          Sign Up
        </button>
        <div className="flex gap-2 mt-4 w-full ">
          <p className="text-sm text-blackOverlay  dark:text-white">
            Already have an account?{" "}
          </p>
          <Link
            to="/login"
            className="text-sm hover:underline text-gray-800 hover:text-hovermainColor"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
