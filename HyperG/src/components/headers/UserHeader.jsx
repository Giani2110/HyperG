import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBook, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UserHeader() {
  return (
    <header className="bg-gray-900 text-white p-6 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">HyperG</h1>
        <nav className="flex space-x-8">
          <a
            href="#catalogo"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faStore} className="text-2xl" />
            <span className="text-xl">Catálogo</span>
          </a>

          <a
            href="#biblioteca"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faBook} className="text-2xl" />
            <span className="text-xl">Biblioteca</span>
          </a>

          <a
            href="#perfil"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-green-600 hover:bg-green-500 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
            <span className="text-xl">Perfil</span>
          </a>

          <a
            href="#logout"
            className="flex items-center space-x-3 px-6 py-3 rounded-md bg-red-600 hover:bg-red-500 transition-colors duration-300 text-lg"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
            <span className="text-xl">Cerrar sesión</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default UserHeader;
