import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Footer from "../../components/footer/Footer";

function Dashboard() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/catalog");
        
        if (response.data && Array.isArray(response.data.games)) {
          setGames(response.data.games);
        } else {
          setError("Formato de datos inválido");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setError("No se pudieron cargar los juegos. Por favor, inténtelo de nuevo.");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Edit game handler
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
        <div class="swal2-input-group">
          <label for="price" class="swal2-label">Precio</label>
          <input id="price" class="swal2-input" value="${game.price}">
        </div>
        <div class="swal2-input-group">
          <label for="rating" class="swal2-label">Calificación</label>
          <input id="rating" class="swal2-input" value="${game.rating}" type="number" min="0" max="5" step="0.1">
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

        // Basic validation
        if (!title || !genre || !platform || !price || !rating) {
          Swal.showValidationMessage('Por favor, complete todos los campos');
          return false;
        }

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
        const response = await axios.put(`http://localhost:5000/api/v1/admin/updategame/${game.id}`, formValues);
        
        // Update local state with the response from the server
        setGames((prevGames) => 
          prevGames.map((g) => 
            g.id === game.id ? response.data.game : g
          )
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
          text: error.response?.data?.message || "No se pudo actualizar el juego.",
          icon: "error",
          background: "#2d2d2d",
          color: "#ffffff",
        });
      }
    }
  };

  // Delete game handler
  const handleDeleteGame = async (gameId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
      background: "#2d2d2d",
      color: "#ffffff",
      customClass: {
        confirmButton: 'swal2-confirm bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition duration-300',
        cancelButton: 'swal2-cancel bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm transition duration-300'
      }
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/admin/deletegame/${gameId}`);
        
        setGames((prevGames) => 
          prevGames.filter((game) => game.id !== gameId)
        );

        Swal.fire({
          title: "Juego eliminado",
          text: "El juego ha sido eliminado correctamente.",
          icon: "success",
          background: "#2d2d2d",
          color: "#ffffff",
        });
      } catch (error) {
        console.error("Error al eliminar el juego:", error);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "No se pudo eliminar el juego.",
          icon: "error",
          background: "#2d2d2d",
          color: "#ffffff",
        });
      }
    }
  };

  // Filter games based on search query
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Cargando juegos...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-2xl text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8" style={{ marginTop: "80px" }}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title */}
        <motion.h4
          className="text-white text-center mb-12 mt-12 text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Panel de Administración de Juegos
        </motion.h4>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar juego por título"
              className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute top-3 left-3 text-gray-400">
              <FaSearch />
            </div>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          <div className="text-center text-white text-xl mt-12">
            No se encontraron juegos
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-white p-4 rounded-lg shadow-lg flex flex-col"
              >
                {/* Game Image */}
                <div className="mb-4 overflow-hidden rounded-md">
                  <img
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    src={game.img}
                    alt={game.title}
                  />
                </div>

                {/* Game Details */}
                <div className="flex-grow">
                  <h5 className="text-white font-semibold text-lg mb-2 truncate">
                    {game.title}
                  </h5>
                  
                  <div className="text-gray-400 text-sm mb-2">
                    <div className="flex justify-between">
                      <span>Género:</span>
                      <span className="font-medium">{game.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plataforma:</span>
                      <span className="font-medium">{game.platform}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-green-500 font-bold text-lg">{game.price}</span>
                    <div className="flex items-center text-yellow-400">
                      <span className="ml-1 text-sm">{game.rating} / 5</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEditGame(game)}
                    className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition duration-300"
                  >
                    <FaEdit className="mr-2" /> Editar
                  </button>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition duration-300"
                  >
                    <FaTrash className="mr-2" /> Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;