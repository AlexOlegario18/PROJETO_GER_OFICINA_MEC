import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Oficina:user');
    
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (usuario, senha) => {
    try {
      const response = await api.post('/login', { usuario, senha });
      
      const userData = {
        id: response.id,
        nome: response.nome,
        tipo: response.tipo
      };

      setUser(userData);
      localStorage.setItem('@Oficina:user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@Oficina:user');
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
