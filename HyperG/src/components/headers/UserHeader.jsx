import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faBook, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function UserHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">HyperG</h1>
        <nav className="flex space-x-4">
          <Link
            to="/catalog"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faStore} />
            <span>Catálogo</span>
          </Link>

          <Link
            to="/library"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faBook} />
            <span>Biblioteca</span>
          </Link>

          <Link
            to="/perfil"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Perfil</span>
          </Link>

          <button

            className="flex items-center space-x-2 px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition-colors duration-200 text-base"
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

export default UserHeader;