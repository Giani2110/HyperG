import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/games")
      .then((response) => setGames(response.data))
      .catch((error) => console.error("Error al obtener los juegos:", error));
  }, []);

  const handleEditGame = async (game) => {
    const { value: formValues } = await Swal.fire({
      title: `<i class="fas fa-edit"></i> Editar: ${game.title}`,
      html: `
        <div class="swal2-input-group">
          <label for="title" class="swal2-label">Título</label>
          <input id="title" class="swal2-input" value="${game.title}">
        </div>
        <div class="swal2-input-group">
          <label for="genre" class="swal2-label">Género</label>
          <input id="genre" class="swal2-input" value="${game.genre}">
        </div>
        <div class="swal2-input-group">
          <label for="platform" class="swal2-label">Plataforma</label>
          <input id="platform" class="swal2-input" value="${game.platform}">
        </div>
        <div class="swal2-input-group swal2-input-group-file">
          <label for="price" class="swal2-label">Precio</label>
          <input id="price" class="swal2-input" value="${game.price}">
        </div>
        <div class="swal2-input-group">
          <label for="rating" class="swal2-label">Calificación</label>
          <input id="rating" class="swal2-input" value="${game.rating}">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: `<i class="fas fa-save"></i> Guardar cambios`,
      cancelButtonText: `<i class="fas fa-times"></i> Cancelar`,
      background: "#2d2d2d",
      color: "#ffffff",
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const genre = document.getElementById("genre").value;
        const platform = document.getElementById("platform").value;
        const price = document.getElementById("price").value;
        const rating = document.getElementById("rating").value;
        return { title, genre, platform, price, rating };
      },
      customClass: {
        title: 'text-white text-2xl font-bold',
        htmlContainer: 'swal2-html-container text-white',
        input: 'swal2-input bg-gray-800 text-white border-none p-2 rounded-md mb-4 w-full',
        confirmButton: 'swal2-confirm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition duration-300',
        cancelButton: 'swal2-cancel bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm transition duration-300'
      },
    });

    if (formValues) {
      try {
        const updatedGame = { ...game, ...formValues };
        await axios.put(`http://localhost:5000/games/${game.id}`, updatedGame);
        setGames((prevGames) =>
          prevGames.map((g) => (g.id === game.id ? updatedGame : g))
        );
        Swal.fire({
          title: "Juego actualizado",
          text: "Los cambios se han guardado correctamente.",
          icon: "success",
          background: "#2d2d2d",
          color: "#ffffff",
        });
      } catch (error) {
        console.error("Error al actualizar el juego:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el juego. Por favor, inténtelo nuevamente.",
          icon: "error",
          background: "#2d2d2d",
          color: "#ffffff",
        });
      }
    }
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen py-8" style={{ marginTop: "80px" }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h4
          className="text-white text-center mb-12 mt-12 text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Panel de Administración de Juegos
        </motion.h4>

        <div className="flex justify-center mb-6">
          <div className="relative w-1/2 sm:w-1/3 md:w-1/4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute top-3 right-3 text-gray-400">
              <FaSearch />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-white p-4 rounded-md shadow-lg flex flex-col"
            >
              <img
                className="w-full h-80 object-cover rounded-md mb-4"
                src={game.img}
                alt={game.title}
              />
              <h5 className="text-white font-semibold text-lg mb-2">{game.title}</h5>
              <div className="text-gray-400 text-sm mb-2">
                <span className="block">Género: {game.genre}</span>
                <span className="block">Plataforma: {game.platform}</span>
              </div>
              <span className="text-green-500 font-bold">{game.price}</span>
              <span className="text-gray-400 text-sm mt-2">
                Calificación: {game.rating} / 5
              </span>
              <button
                onClick={() => handleEditGame(game)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-auto rounded-md text-sm transition duration-300"
              >
                Editar
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;