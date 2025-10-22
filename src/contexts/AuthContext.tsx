import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@travel.pl',
    name: 'Administrator',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'user@travel.pl',
    name: 'Jan Kowalski',
    role: 'client',
    createdAt: new Date('2024-01-15')
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('travel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load user favorites
    const storedFavorites = localStorage.getItem('travel_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('travel_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'client',
      createdAt: new Date()
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('travel_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('travel_user');
    localStorage.removeItem('travel_favorites');
  };

  const addToFavorites = (offerId: string) => {
    if (!user) return;
    
    const newFavorites = [...favorites, offerId];
    setFavorites(newFavorites);
    localStorage.setItem('travel_favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (offerId: string) => {
    const newFavorites = favorites.filter(id => id !== offerId);
    setFavorites(newFavorites);
    localStorage.setItem('travel_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (offerId: string) => {
    return favorites.includes(offerId);
  };
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading, 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};