import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Header } from '../../src/components/big/header/Header';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { auth } from '../../src/firebase/Firebase';
import styles from './RegisterPage.module.scss';

const Register: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { t, lang } = useTranslation('common');

  const handleCreateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/verifyuser');
        setData({
          username: '',
          email: '',
          password: '',
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
        <form onSubmit={handleCreateUser} className={styles.formStyle}>
          <div className={styles.formHeader}>
            <KeyboardBackspaceIcon
              className={styles.goBack}
              onClick={() => router.back()}
            />
            <h1 className={styles.title}>Skapa konto</h1>
          </div>
          <InputField
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email"
            type="text"
          />
          <InputField
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
            type="text"
          />
          <PrimaryButton submit={true} text="Skapa konto" />
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
