import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    axios.get('https://online-shopping-management-backend.onrender.com/verify', { withCredentials: true })
      .then(res => {
        console.log("Verification Response:", res.data); // Debug log

        if (res.data.userId) {
          setUserId(res.data.userId);
          localStorage.setItem('userId', res.data.userId);
        } else {
          localStorage.removeItem('userId');
        }
      })
      .catch(err => {
        console.error("Error verifying token:", err); // Debug log
        localStorage.removeItem('userId');
      });
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
