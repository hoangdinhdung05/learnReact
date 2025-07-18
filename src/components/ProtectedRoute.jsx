// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) {
    console.log("ProtectedRoute: Loading authentication...");
    return <div>Loading authentication...</div>;
  }

  if (!isLoggedIn) {
    console.log("ProtectedRoute: Not logged in. Redirecting to /login.");
    return <Navigate to="/" replace />;
  }

  const hasRequiredRole = allowedRoles.some(role => user?.roles?.includes(role));

  if (!hasRequiredRole) {
    console.log(`ProtectedRoute: Access denied. User roles: ${user?.roles?.join(', ')}. Required: ${allowedRoles.join(', ')}. Redirecting to /unauthorized.`);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("ProtectedRoute: Access granted.");
  return children;
};

export default ProtectedRoute;