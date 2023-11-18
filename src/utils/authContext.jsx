import { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import restClient from './restClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
        const userResp = await restClient.get('/api/whoami');
        setIsAdmin(userResp.data.body.role == 'admin');
    } catch (error) {
        navigate('/login');
    }
  };

  const joinPremium = async () => {
    try {
        const userResp = await restClient.get('/api/whoami');
        setIsPremium(userResp.data.body.is_premium);
        if (!userResp.data.body.is_premium)
            navigate('/join');
    } catch (error) {
        navigate('/join');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, setIsAuthenticated, isAdmin, setIsAdmin, isPremium, joinPremium }}>
      {children}
    </AuthContext.Provider>
  );
};