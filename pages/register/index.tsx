import { useToast } from '@chakra-ui/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AuthContext } from '../../src/auth/AuthContext';
import { FilesInput } from '../../src/components/filesInput/FilesInput';
import { Header } from '../../src/components/header/Header';
import { InputField } from '../../src/components/inputfield/InputField';
import { PrimaryButton } from '../../src/components/primarybtn/PrimaryBtn';
import { db, storage } from '../../src/firebase/Firebase';
import styles from './RegisterPage.module.scss';

const Register: NextPage = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [imageUpload, setImageUpload] = useState();
  const [details, setDetails] = useState({
    displayName: '',
    photoURL: '',
  });
  const auth = getAuth();
  const router = useRouter();
  const { t } = useTranslation('common');
  const { setProfile } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDetails({ ...details, photoURL: url });
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpload]);

  const signupUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
          displayName: details.displayName,
          photoURL: details.photoURL,
          email: data.email,
          description: '',
        });
      })
      .then(() =>
        updateProfile(auth.currentUser!, {
          displayName: details.displayName,
          photoURL: details.photoURL,
        })
      )
      .then(() => {
        setProfile(data);
        toast({
          title: 'Användare skapad.',
          duration: 2000,
          status: 'success',
          onCloseComplete: () => router.push('/profile'),
        });
      })
      .catch((error) => {
        setError(t(`${error.code}`));
      });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form
          onSubmit={signupUser}
          className={styles.formStyle}
          id="registerForm"
        >
          <div className={styles.formHeader}>
            <KeyboardBackspaceIcon
              className={styles.goBack}
              onClick={() => router.back()}
            />
            <h1 className={styles.title}>Skapa konto</h1>
          </div>
          <InputField
            value={details.displayName}
            onChange={(e) =>
              setDetails({ ...details, displayName: e.target.value })
            }
            placeholder="Användarnamn"
            type="text"
            id="displayName"
          />
          <InputField
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email"
            type="email"
            id="email"
          />
          <InputField
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Lösenord"
            type="password"
            id="password"
          />
          <FilesInput
            onChange={(e) => setImageUpload(e.currentTarget.files[0])}
            type="file"
            id="profileImage"
          />
          <PrimaryButton
            submit
            text="Skapa konto"
            disabled={!details.photoURL}
          />
          <div style={{ color: 'white' }}>{error}</div>
          <p className={styles.link}>
            <Link href="/login">Logga in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
