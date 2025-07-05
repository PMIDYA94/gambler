import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mock login logic
      const userData = {
        id: '1',
        email,
        name: 'User',
        balance: 1000,
        totalWithdrawn: 0,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return {success: true};
    } catch (error) {
      return {success: false, error: 'Login failed'};
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Mock signup logic
      const userData = {
        id: '1',
        email,
        name,
        balance: 1000,
        totalWithdrawn: 0,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return {success: true};
    } catch (error) {
      return {success: false, error: 'Signup failed'};
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateBalance = async (newBalance, withdrawn = 0) => {
    try {
      const updatedUser = {
        ...user,
        balance: newBalance,
        totalWithdrawn: user.totalWithdrawn + withdrawn,
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateBalance,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
