import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'donor' | 'ngo' | 'admin';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  role: UserRole | null;
  login: (username?: string, role?: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (name?: string, userRole?: UserRole) => {
    setIsLoggedIn(true);
    setUsername(name || 'Priya');
    setRole(userRole || 'donor');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};