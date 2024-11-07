import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faBook, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function UserHeader() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">HyperG</h1>
        <nav className="flex space-x-4">
          <a
            href="#catalogo"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faStore} />
            <span>Catálogo</span>
          </a>

          <a
            href="#biblioteca"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faBook} />
            <span>Biblioteca</span>
          </a>

          <a
            href="#perfil"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Perfil</span>
          </a>

          <a
            href="#logout"
            className="flex items-center space-x-2 px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition-colors duration-200 text-base"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Cerrar sesión</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default UserHeader;
