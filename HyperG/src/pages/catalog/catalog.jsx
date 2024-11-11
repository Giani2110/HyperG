import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faStar, faGamepad, faDesktop, faTag } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Footer from "../../components/footer/Footer";
import axios from "axios";

function Catalog() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/games")
      .then(response => setGames(response.data))
      .catch(error => console.error("Error al obtener los juegos:", error));
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  const handleClearFilters = () => {
    setSearch("");
    setGenre("");
    setPlatform("");
    setPrice("");
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8" style={{ marginTop: "80px" }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <h4 className="text-white text-center mb-12 mt-12 text-2xl font-bold">Catálogo de Juegos</h4>

        <div className="flex gap-8">
          <div className="bg-gray-800 p-6 rounded-md w-1/4 space-y-6 sticky top-24 z-10 h-[500px] overflow-y-auto">
            <h6 className="text-white mb-4 text-lg font-semibold">Filtros</h6>

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
          </div>

          <div className="flex-grow">
            <div className="space-y-8">
              {games
                .filter(game => {
                  return (
                    (search === "" || game.title.toLowerCase().includes(search.toLowerCase())) &&
                    (genre === "" || game.genre === genre) &&
                    (platform === "" || game.platform === platform) &&
                    (price === "" || (
                      (price === "0-20" && parseFloat(game.price.slice(1)) <= 20) ||
                      (price === "20-50" && parseFloat(game.price.slice(1)) > 20 && parseFloat(game.price.slice(1)) <= 50) ||
                      (price === "50+" && parseFloat(game.price.slice(1)) > 50)
                    ))
                  );
                })
                .map((game) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 text-white p-6 rounded-md shadow-lg"
                  >
                    <div className="flex items-center justify-between space-x-4">
                      <img className="w-32 h-32 object-cover rounded-md" src={game.img} alt={game.title} />
                      <div className="flex flex-col justify-between w-full">
                        <h5 className="text-white font-semibold text-xl">{game.title}</h5>
                        <div className="text-gray-400 text-sm">
                          <span className="block">Género: {game.genre}</span>
                          <span className="block">Plataforma: {game.platform}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="flex items-center text-yellow-400">
                            <FontAwesomeIcon icon={faStar} className="mr-1" />
                            {game.rating}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mt-6 self-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                        Comprar - {game.price}
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Catalog;
