import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, updateUserMode, loginUser, logoutUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentMode, setCurrentMode] = useState('borrower'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setUser(response.data);
          setCurrentMode(response.data.currentMode || 'borrower');
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        setUser(response.data);
        setCurrentMode(response.data.currentMode || 'borrower');
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (userInfo) => {
    try {
      const response = await registerUser(userInfo);
      if (response.success) {
        setUser(response.data);
        setCurrentMode(response.data.currentMode || 'borrower');
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setCurrentMode('borrower');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const switchMode = async (mode) => {
    try {
      const response = await updateUserMode(mode);
      if (response.success) {
        setCurrentMode(mode);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to switch mode:', error);
    }
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    currentMode,
    loading,
    isAuthenticated: !!user,
    isBorrower: currentMode === 'borrower',
    isLender: currentMode === 'lender',
    login,
    signup,
    logout,
    switchMode,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
