import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "../utils/api";
import { AppState } from "../App";
const HeaderPart = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      sessionStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <header className="bg-headbg fixed text-white py-2 lg:py-1 transition-all duration-500 z-[997] items-center top-0 flex w-full">
        <div className="container mx-auto px-4 xl:px-8 items-center justify-between relative flex">
          <Link
            to="/"
            className="leading-none flex items-center mr-auto lg:mr-0 ml-2"
          >
            <h1 className="text-2xl font-bold m-0 text-white">SRT</h1>
            <span className="text-2xl text-cyan-500">.</span>
          </Link>

          <button
            className="text-2xl text-white lg:hidden focus:outline-none z-[999]"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav
            id="navmenu"
            className={`absolute lg:relative top-[60px] lg:top-auto left-0 w-full lg:w-auto bg-headbg lg:bg-transparent transition-all duration-300 lg:flex items-center lg:p-0 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="m-0 p-4 lg:p-0 flex flex-col lg:flex-row items-center list-none">
              <li className="relative">
                <Link
                  to="/"
                  className="block text-white lg:text-navcolor  items-center justify-between whitespace-nowrap transition duration-300 px-4 py-2 lg:py-[18px] text-base font-[400] hover:text-accentcolor"
                >
                  Home
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/:about"
                  className="block text-white lg:text-navcolor items-center justify-between whitespace-nowrap transition duration-300 px-4 py-2 lg:py-[18px] text-base font-[400] hover:text-accentcolor"
                >
                  About
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/:process"
                  className="block text-white lg:text-navcolor  items-center justify-between whitespace-nowrap transition duration-300 px-4 py-2 lg:py-[18px] text-base font-[400] hover:text-accentcolor"
                >
                  Process
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/:status"
                  className="block text-white lg:text-navcolor  items-center justify-between whitespace-nowrap transition duration-300 px-4 py-2 lg:py-[18px] text-base font-[400] hover:text-accentcolor"
                >
                  Status
                </Link>
              </li>
              <li className="relative pr-0">
                <Link
                  to="/contact"
                  className="block text-white lg:text-navcolor items-center justify-between whitespace-nowrap transition duration-300 px-4 py-2 lg:py-[18px] text-base font-[400] hover:text-accentcolor"
                >
                  Contact
                </Link>
              </li>

              {/* Get Started Button (centered in mobile menu) */}
              <li
                className={`lg:hidden mt-4 ${
                  menuOpen ? "block text-center w-full" : "hidden"
                }`}
              >
                <Link
                  to="/login"
                  className="block text-white text-sm px-5 py-2 mx-auto w-[20%] border-2 border-cyan-500 transition duration-300 hover:text-default-color 
                  xs:w-[30%]
                  hover:bg-accentcolor rounded-xl"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>

          {user ? (
            <button
              onClick={handleLogout}
              className="hidden lg:block text-white text-sm px-5 py-2 ml-[30px] border-2 border-cyan-500 transition duration-300 hover:text-default-color hover:bg-accentcolor rounded-xl"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden lg:block text-white text-sm px-5 py-2 ml-[30px] border-2 border-cyan-500 transition duration-300 hover:text-default-color hover:bg-accentcolor rounded-xl"
            >
              Get Started
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderPart;
