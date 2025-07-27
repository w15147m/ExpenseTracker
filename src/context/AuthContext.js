import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Import your configured client

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      // Get the initial session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };

    fetchSession();

    // Listen for auth state changes (SIGN_IN, SIGN_OUT, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Unsubscribe from the listener when the component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const authContextValue = {
    // We pass the functions directly from supabase.auth
    signUp: (email, password) => supabase.auth.signUp({ email, password }),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};