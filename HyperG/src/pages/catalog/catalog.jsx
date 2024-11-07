import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Catalog() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [price, setPrice] = useState("");

  const games = [
    { id: 1, title: "Cyberpunk 2077", genre: "RPG", price: "$29.99", rating: 4.5, platform: "PC", img: "https://placehold.co/150x200" },
    { id: 2, title: "The Witcher 3", genre: "RPG", price: "$19.99", rating: 4.8, platform: "PC", img: "https://placehold.co/150x200" },
    { id: 3, title: "Red Dead Redemption 2", genre: "Action", price: "$39.99", rating: 4.6, platform: "Console", img: "https://placehold.co/150x200" },
    { id: 4, title: "Elden Ring", genre: "Adventure", price: "$59.99", rating: 4.9, platform: "Console", img: "https://placehold.co/150x200" },
  ];

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handlePlatformChange = (e) => setPlatform(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  return (
    <div className="bg-gray-900 min-h-screen py-8" style={{ marginTop: "80px" }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <h4 className="text-white text-center mb-12 mt-12 text-2xl font-bold">Catálogo de Juegos</h4>

        <div className="flex gap-4">
          <div className="bg-gray-800 p-6 rounded-md w-full sm:w-1/4 space-y-6">
            <h6 className="text-white mb-4 text-lg font-semibold">Filtros</h6>

            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-white" />
            </div>

            <div className="relative">
              <select
                value={genre}
                onChange={handleGenreChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              >
                <option value="" disabled>Selecciona Género</option>
                <option value="RPG">RPG</option>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
              </select>
              <FontAwesomeIcon icon={faShoppingCart} className="absolute left-3 top-3 text-white" />
            </div>

            <div className="relative">
              <select
                value={platform}
                onChange={handlePlatformChange}
                className="bg-gray-700 text-white p-3 pl-10 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
              >
                <option value="" disabled>Selecciona Plataforma</option>
                <option value="PC">PC</option>
                <option value="Consola">Consola</option>
              </select>
              <FontAwesomeIcon icon={faShoppingCart} className="absolute left-3 top-3 text-white" />
            </div>

            <div className="relative">
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
              <FontAwesomeIcon icon={faShoppingCart} className="absolute left-3 top-3 text-white" />
            </div>
          </div>

          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                  <div key={game.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="bg-gray-800 text-white rounded-md shadow-lg">
                        <img className="w-full h-48 object-cover rounded-t-md" src={game.img} alt={game.title} />
                        <div className="p-4">
                          <h5 className="text-white font-semibold">{game.title}</h5>
                          <p className="text-gray-400 mt-1">Género: {game.genre}</p>
                          <p className="text-gray-400 mt-1">Plataforma: {game.platform}</p>
                          <div className="flex items-center mt-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                            <span className="text-gray-400">{game.rating}</span>
                          </div>
                          <p className="text-yellow-500 text-xl mt-2">{game.price}</p>
                        </div>
                        <div className="p-4">
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Comprar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
