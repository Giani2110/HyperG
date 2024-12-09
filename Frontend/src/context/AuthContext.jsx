import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log("Saving user data:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Guardamos todo el objeto de usuario
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
    <AuthContext.Provider value={{ user, login, addLibraryGame, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};