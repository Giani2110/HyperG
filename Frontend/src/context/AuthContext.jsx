import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsAuthenticated(true);
      if (decodedToken.exp < Date.now() / 1000) {
        logout();
      }
    } else {
      toast.error('Token no encontrado en el almacenamiento local');
      navigate('/home');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.status === 200) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      const decodedToken = jwtDecode(data.token);
      setUser(decodedToken);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error en el servidor");
      }
  
      if (response.status === 201) {
        toast.success("Registro exitoso");
        navigate('/login');
      } else if (response.status === 409) {
        toast.error(data.message || "El correo o nombre de usuario ya están en uso");
      } else {
        toast.error("Hubo un error en el registro");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      toast.error("Hubo un error en la conexión con el servidor");
    }
  };  

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/home');
  };

  const addLibraryGame = (game) => {
    if (user) {
      const updatedLibrary = [...user.library, game];
      const updatedUser = { ...user, library: updatedLibrary }; // No sobrescribir el resto de los datos
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Guardamos el usuario actualizado
      console.log("Juego agregado a la biblioteca:", game);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, addLibraryGame, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
