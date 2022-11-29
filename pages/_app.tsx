import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { AuthContext } from '../src/auth/AuthContext';
import { auth } from '../src/firebase/Firebase';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setCurrentUser({
          email: user.email,
          id: uid,
          photo: user.photoURL,
          name: user.displayName,
        }); // ...
        console.log('inloggad', user);
      } else {
        setCurrentUser({});
        console.log('ej inloggad', user);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
