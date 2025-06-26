// Frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        console.log('userdata from AuthContext.jsx',userData);
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (username, password) => {
    const data = await authLogin(username, password);
    setUser(data.user);
    localStorage.setItem('token', data.access);
    localStorage.setItem('refreshToken', data.refresh);
  };

 const register = async (userData) => {
  try {
    const data = await authRegister(userData);
    // don't set user here, as registration does not log in the user
    return data; // Return the data for the component to handle
  } catch (error) {
    throw error; // Re-throw the error for the component to handle
  }
};

  const logout = async () => {
    await authLogout();
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return true; // Indicate successful logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);