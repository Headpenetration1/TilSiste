import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUser } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sjekk for eksisterende innlogging ved oppstart
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Feil ved henting av bruker:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simuler API-kall
      await new Promise((resolve) => setTimeout(resolve, 800));

      // For demo: aksepter alle innlogginger, sett rolle til admin for å vise alle funksjoner
      const loginUser = { ...mockUser, role: 'admin' };
      await AsyncStorage.setItem('user', JSON.stringify(loginUser));
      setUser(loginUser);
      return true;
    } catch (error) {
      console.error('Feil ved innlogging:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Feil ved utlogging:', error);
    }
  };

  const updateUserData = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      // Oppdater avatar basert på nytt navn hvis navn er endret
      if (updates.name) {
        updatedUser.avatar = updates.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
      }
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Feil ved oppdatering av bruker:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth må brukes innenfor AuthProvider');
  }
  return context;
}
