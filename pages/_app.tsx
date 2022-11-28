import { onAuthStateChanged } from "firebase/auth";
import type { AppProps } from "next/app";
import { useState } from "react";
import { AuthContext } from "../src/auth/AuthContext";
import { auth } from "../src/firebase/Firebase";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState({});

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
      });
      // ...
    }
  });

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
