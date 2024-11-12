import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaSave } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!user) {
    return <div>Loading...</div>;
  }

  const validate = () => {
    if (!email.includes('@')) {
      toast.error('Por favor ingresa un correo electrónico válido', { position: 'top-center' });
      return false;
    }

    if (!username || !email || !password) {
      toast.error('Por favor complete todos los campos', { position: 'top-center' });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    const updatedUser = {
      ...user,
      username,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:5000/users/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        login(updatedUserData);
        setSuccessMessage('Datos actualizados correctamente'); // Mostrar mensaje de éxito
      } else {
        throw new Error('Error al actualizar los datos');
      }
    } catch (err) {
      setError(err.message || 'Error al actualizar');
      toast.error('Error al actualizar los datos', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-100">Perfil de {username}</h3>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-500 text-white text-center rounded-lg">
          {successMessage}
        </div>
      )}

      <motion.div
        className="max-w-xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="mb-4">
          <label className="text-sm text-gray-300">Username:</label>
          <div className="flex items-center bg-gray-700 text-white rounded-lg p-2 shadow-md">
            <FaUser className="text-indigo-500 text-lg mr-3" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm placeholder-gray-400"
              placeholder="Nuevo nombre de usuario"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-300">Email:</label>
          <div className="flex items-center bg-gray-700 text-white rounded-lg p-2 shadow-md">
            <FaEnvelope className="text-indigo-500 text-lg mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm placeholder-gray-400"
              placeholder="Nuevo correo electrónico"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-300">Contraseña:</label>
          <div className="flex items-center bg-gray-700 text-white rounded-lg p-2 shadow-md">
            <FaLock className="text-indigo-500 text-lg mr-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-sm placeholder-gray-400"
              placeholder="Nueva contraseña"
            />
          </div>
        </div>

        <motion.button
          onClick={handleSave}
          className="bg-indigo-500 text-white p-1 rounded-lg w-full hover:bg-indigo-600 focus:outline-none transition-all duration-300 ease-in-out shadow-lg mt-6 text-sm"
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Guardando...' : <> Guardar cambios</>}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
