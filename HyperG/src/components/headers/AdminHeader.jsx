import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function AdminHeader() {
  return (
    <header className="bg-gray-900 text-white p-6 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <nav className="flex space-x-8">
          <a
            href="#dashboard"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="text-2xl" />
            <span className="text-xl">Dashboard</span>
          </a>

          <a
            href="#users"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-gray-800 hover:bg-gray-600 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            <span className="text-xl">Users</span>
          </a>

          <a
            href="#logout"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-red-600 hover:bg-red-500 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
            <span className="text-xl">Logout</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
