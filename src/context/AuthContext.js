import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const signIn = async (token) => {
    setIsLoading(true);
    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};