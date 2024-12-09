import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function LandingHeader() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HyperG</h1>
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faHome} className="text-xl" />
            <span className="text-lg text-white">Home</span>
          </Link>
          
          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="text-xl" />
            <span className="text-lg text-white">Login</span>
          </Link>
          
          <Link
            to="/register"
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
            <span className="text-lg text-white">Register</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default LandingHeader;
