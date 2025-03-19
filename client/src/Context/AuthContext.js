import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token') // Read token at startup
  );

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);  // ✅ Instantly update state
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // ✅ Instantly update state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
