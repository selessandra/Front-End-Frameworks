import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redireciona para login se não tiver token
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;