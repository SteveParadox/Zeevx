import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseAuth } from './Firebase.js'; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuth(authUser);
      } else {
        setAuth(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await FirebaseAuth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
