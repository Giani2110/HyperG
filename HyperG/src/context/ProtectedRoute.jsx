import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log(user);

  if (!allowedRoles.includes(user.type)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;