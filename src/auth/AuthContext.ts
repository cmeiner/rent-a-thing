import { createContext } from 'react';

export const AuthContext = createContext({
  currentUser: {},
  setCurrentUser: (currentUser: {}) => {},
  profile: {},
  setProfile: (profile: {}) => {},
  setPhoto: (photo: {}) => {}
});
