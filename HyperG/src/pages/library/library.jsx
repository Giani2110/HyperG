import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaStar, FaPlay, FaSearch, FaSort, FaFilter, FaTags, FaChevronDown, FaChevronUp, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function Library() {
  const { user, loading } = useAuth();
  const [userLibrary, setUserLibrary] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const userId = user.id;

    fetch(`http://localhost:5000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserLibrary(data.library);
      })
      .catch((error) => {
        console.error('Error al obtener la biblioteca:', error);
      });
  }, [user]);

  const handleInstallClick = (gameId) => {
    Swal.fire({
      title: 'Instalando...',
      html: 'Espera un momento mientras instalamos el juego',
      timer: 7000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        const updatedLibrary = userLibrary.map(game =>
          game.id === gameId ? { ...game, installed: true } : game
        );
        setUserLibrary(updatedLibrary);

        const userId = user.id;
        fetch(`http://localhost:5000/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ library: updatedLibrary }),
        })
          .then((response) => response.json())
          .then((data) => console.log("Biblioteca actualizada", data))
          .catch((error) => console.error("Error al actualizar la biblioteca:", error));
      },
      background: '#1a1a1a',
      color: '#fff',
      confirmButtonColor: '#3b82f6',
    });
  };

  const handleDeleteClick = (gameId) => {
    const updatedLibrary = userLibrary.map(game =>
      game.id === gameId ? { ...game, installed: false } : game
    );
    setUserLibrary(updatedLibrary);

    const userId = user.id;
    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ library: updatedLibrary }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Biblioteca actualizada", data))
      .catch((error) => console.error("Error al actualizar la biblioteca:", error));

    Swal.fire({
      icon: 'success',
      title: 'Juego desinstalado',
      text: 'El juego ha sido desinstalado y está disponible para instalar de nuevo',
      timer: 3000,
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      background: '#1a1a1a',
      color: '#fff',
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterGenreChange = (e) => {
    setFilterGenre(e.target.value);
  };

  const handleFilterPlatformChange = (e) => {
    setFilterPlatform(e.target.value);
  };

  const handleClearFilters = () => {
    setFilterGenre('');
    setFilterPlatform('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredLibrary = userLibrary
    .filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game) => (filterGenre ? game.genre === filterGenre : true))
    .filter((game) => (filterPlatform ? game.platform === filterPlatform : true));

  const sortedLibrary = filteredLibrary.sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-4 mt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-4">Biblioteca de {user.username}</h3>
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-gray-700 text-white rounded-lg p-2 w-64"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaSort className="text-gray-400" />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="title">Ordenar por Título</option>
            <option value="rating">Ordenar por Calificación</option>
          </select>
        </div>
        <button onClick={toggleFilters} className="flex items-center space-x-2 bg-gray-700 text-white p-2 rounded-lg">
          <FaFilter />
          <span>Filtros</span>
          {showFilters ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {showFilters && (
        <div className="mb-8">
          <div className="flex justify-between items-center space-x-4">
            <div className="w-1/2">
              <label className="text-gray-300">Género:</label>
              <select
                value={filterGenre}
                onChange={handleFilterGenreChange}
                className="bg-gray-700 text-white rounded-lg p-2 w-full"
              >
                <option value="">Todos</option>
                <option value="Action">Acción</option>
                <option value="Adventure">Aventura</option>
                <option value="RPG">RPG</option>
                <option value="Sports">Deportes</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="text-gray-300">Plataforma:</label>
              <select
                value={filterPlatform}
                onChange={handleFilterPlatformChange}
                className="bg-gray-700 text-white rounded-lg p-2 w-full"
              >
                <option value="">Todas</option>
                <option value="PC">PC</option>
                <option value="Console">Consola</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleClearFilters}
                className="bg-red-500 text-white p-3 rounded-lg flex items-center space-x-2 mt-5 hover:bg-red-600 transition duration-300"
              >
                <FaTimesCircle className="text-white" />
                <span>Limpiar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedLibrary.map((game) => (
          <motion.div
            key={game.id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src={game.img}
                alt={game.title}
                className="w-48 h-60 object-cover rounded-md mb-4 hover:scale-105 transition duration-300"
              />
              <div className="flex justify-between gap-4 items-center mb-2 w-full">
                <h3 className="text-lg font-semibold truncate">{game.title}</h3>
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span>{game.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400">{game.genre}</p>
            <p className="text-sm text-gray-400">{game.platform}</p>
            <p className="text-sm text-gray-400 mt-2">{game.price} USD</p>
            <p className="text-sm text-gray-400 mt-2">{game.description}</p>
            <div className="mt-4">
              {game.installed ? (
                <button
                  onClick={() => handleDeleteClick(game.id)}
                  className="bg-red-500 text-white p-3 rounded-lg w-full hover:bg-red-600 transition duration-300"
                >
                  Desinstalar
                </button>
              ) : (
                <button
                  onClick={() => handleInstallClick(game.id)}
                  className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
                >
                  Instalar
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Library;