import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
