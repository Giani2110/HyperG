import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faStar, faGamepad, faDesktop, faTag } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

function Catalog() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const { addLibraryGame } = useAuth();
  const [price, setPrice] = useState("");
  const [userLibrary, setUserLibrary] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/games")
      .then(response => setGames(response.data))
      .catch(error => console.error("Error al obtener los juegos:", error));

    const userId = user.id;
    axios.get(`http://localhost:5000/users/${userId}`)
      .then(response => setUserLibrary(response.data.library))
      .catch(error => console.error("Error al obtener la biblioteca del usuario:", error));
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const { user } = useAuth();

  const handleClearFilters = () => {
    setSearch("");
    setGenre("");
    setPlatform("");
    setPrice("");
  };

  const handleBuyGame = async (game) => {
    const confirmResult = await Swal.fire({
      title: '¿Desea confirmar la compra?',
      text: "Este juego se agregará a tu biblioteca",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, comprar',
      background: '#2d2d2d',
      color: '#ffffff',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const userId = user.id;
      const updatedLibrary = [...userLibrary, game];
      addLibraryGame(game);

      await axios.patch(`http://localhost:5000/users/${userId}`, { library: updatedLibrary });

      setUserLibrary(updatedLibrary);

      Swal.fire({
        title: 'Compra Exitosa!',
        text: 'El juego se ha agregado a tu biblioteca.',
        icon: 'success',
        background: '#2d2d2d',
        color: '#ffffff',
      });
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al realizar la compra. Por favor, inténtelo nuevamente.',
        icon: 'error',
        background: '#2d2d2d',
        color: '#ffffff',
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8" style={{ marginTop: "80px" }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h4
          className="text-white text-center mb-12 mt-12 text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Catálogo de Juegos de {user.username}
        </motion.h4>

        <div className="flex gap-8">
          <motion.div
            className="bg-gray-800 p-6 rounded-md w-1/4 space-y-6 sticky top-24 z-10 h-[500px] overflow-y-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h6
              className="text-white mb-4 text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Filtros
            </motion.h6>

            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-4 text-white" />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-3 text-white">
                <FontAwesomeIcon icon={faGamepad} />
              </div>
              <select
                value={genre}
                onChange={handleGenreChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              >
                <option value="" disabled>Selecciona Género</option>
                <option value="RPG">RPG</option>
                <option value="Action">Acción</option>
                <option value="Adventure">Aventura</option>
                <option value="Sports">Deporte</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-3 text-white">
                <FontAwesomeIcon icon={faDesktop} />
              </div>
              <select
                value={platform}
                onChange={handlePlatformChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              >
                <option value="" disabled>Selecciona Plataforma</option>
                <option value="PC">PC</option>
                <option value="Console">Consola</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-3 text-white">
                <FontAwesomeIcon icon={faTag} />
              </div>
              <select
                value={price}
                onChange={handlePriceChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              >
                <option value="" disabled>Selecciona Precio</option>
                <option value="0-0">Gratis</option>
                <option value="0-20">Hasta $20</option>
                <option value="20-50">$20 a $50</option>
                <option value="50+">Más de $50</option>
              </select>
            </div>

            <div>
              <button
                onClick={handleClearFilters}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm mt-4"
              >
                Limpiar Filtros
              </button>
            </div>
          </motion.div>

          <div className="flex-grow ">
            <div className="space-y-8 ">
              {games
                .filter(game => {
                  return (
                    (search === "" || game.title.toLowerCase().includes(search.toLowerCase())) &&
                    (genre === "" || game.genre === genre) &&
                    (platform === "" || game.platform === platform) &&
                    (price === "" || (
                      (price === "0-0" && game.price === "Free") ||
                      (price === "0-20" && parseFloat(game.price.slice(1)) <= 20) ||
                      (price === "20-50" && parseFloat(game.price.slice(1)) > 20 && parseFloat(game.price.slice(1)) <= 50) ||
                      (price === "50+" && parseFloat(game.price.slice(1)) > 50)
                    ))
                  );
                })
                .map((game) => {
                  const isOwned = userLibrary.some(libGame => libGame.id === game.id);

                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-white p-6 rounded-md shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between space-x-4">
                        <img className="w-full md:w-1/3 h-60 object-cover rounded-md" src={game.img} alt={game.title} />
                        <motion.div
                          className="flex flex-col justify-between w-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h5 className="text-white font-semibold text-xl">{game.title}</h5>
                          <div className="text-gray-400 text-sm">
                            <span className="block">Género: {game.genre}</span>
                            <span className="block">Plataforma: {game.platform}</span>
                          </div>
                          <span className="text-green-500 font-bold mt-2">{game.price}</span>
                          <span className="text-gray-400 text-sm mt-2"> Calificación: {game.rating} / 5 <FontAwesomeIcon icon={faStar} /></span>
                          <button
                            onClick={() => handleBuyGame(game)}
                            disabled={isOwned}
                            className={`${isOwned ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                              } text-white py-2 px-4 mt-4 rounded-md text-sm transition duration-300 flex items-center justify-between ml-auto`}
                            style={{ minWidth: '120px' }} 
                          >
                            {isOwned ? (
                              <>
                                <span>En Biblioteca</span>
                                <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
                              </>
                            ) : (
                              <>
                                <span>{game.price}</span>
                                <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
                              </>
                            )}
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
