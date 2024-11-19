import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando el usuario

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
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addLibraryGame = (game) => {
    if (user) {
      const updatedLibrary = [...user.library, game];
      setUser({ ...user, library: updatedLibrary });
      localStorage.setItem('user', JSON.stringify({ ...user, library: updatedLibrary }));
      console.log("Juego agregado a la biblioteca:", game);
      console.log(user);
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