import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUsers, faChartBar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">Admin Panel</h1>
        <nav className="flex space-x-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition duration-200 text-base text-white shadow-sm"
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/viewusers"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 transition duration-200 text-base text-white shadow-sm"
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Usuarios</span>
          </Link>

          <Link
            to="/addgames"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 transition duration-200 text-base text-white shadow-sm"
          >
            <FontAwesomeIcon icon={faChartBar} />
            <span>Agregar Juegos</span>
          </Link>

          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition duration-200 text-base text-white shadow-sm"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;