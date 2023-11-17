import { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import restClient from './restClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
        await restClient.get('/api/whoami');
    } catch (error) {
        navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};