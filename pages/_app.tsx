import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { AuthContext } from '../src/auth/AuthContext';
import { auth } from '../src/firebase/Firebase';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState({});
  const [profile, setProfile] = useState({
  });
  
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
      }),
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setCurrentUser({
          email: user.email,
          id: uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
        }); // ...
        console.log('inloggad', user);
      } else {
        setCurrentUser({});
        console.log('ej inloggad', user);
      }
    });
  }, [profile]);
  return (
      <ChakraProvider resetCSS={false} theme={theme}>
      <Component {...pageProps} />
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, profile, setProfile }}
    >
      </ChakraProvider>
    </AuthContext.Provider>
  );
}
