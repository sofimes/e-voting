import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-24 mt-12">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-20">
        {/* Logo and Social Icons */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
          <Link to="/" className="block mb-4">
            <h1 className="text-4xl font-bold m-0 text-white">
              SRT
              <span className="text-2xl text-cyan-500">.</span>
            </h1>
          </Link>
          <div className="flex justify-center md:justify-start space-x-4">
            <BsFacebook
              size="30"
              className="cursor-pointer hover:text-blue-500"
            />
            <AiFillInstagram
              size="35"
              className="cursor-pointer hover:text-pink-500"
            />
            <FaYoutube
              size="35"
              className="cursor-pointer hover:text-red-500"
            />
          </div>
        </div>

        {/* Useful Links */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul>
            <li className="text-gray-400 text-sm hover:text-white mb-2">
              Terms of Use
            </li>
            <li className="text-gray-400 text-sm hover:text-white">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul>
            <li className="text-gray-400 text-sm hover:text-white mb-2">
              sofanitmesfin19@gmail.com
            </li>
            <li className="text-gray-400 text-sm hover:text-white">
              +251-991-50-00-27
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
