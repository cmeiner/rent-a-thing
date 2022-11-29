import React, { createContext } from 'react';

export const AuthContext = createContext({
  currentUser: {},
  setCurrentUser: (currentUser: {}) => {},
});
