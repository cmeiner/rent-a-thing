import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Header } from '../../src/components/big/header/Header';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { auth } from '../../src/firebase/Firebase';
import styles from './LoginPage.module.scss';

const Login: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { t } = useTranslation('common');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/profile');
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
      <div className={styles.loginPage}>
        <form
          onSubmit={handleLogin}
          className={styles.loginForm}
          id="loginform"
        >
          <div className={styles.formHeader}>
            <KeyboardBackspaceIcon
              className={styles.goBack}
              onClick={() => router.back()}
            />
            <h1 className={styles.loginTitle}>Logga in</h1>
          </div>
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
            placeholder="Password"
            type="password"
            id="password"
          />
          <PrimaryButton text="Logga in" submit={true} />
          <div style={{ color: 'white' }}>{error}</div>
          <p className={styles.toRegister} id="toRegister">
            <Link href="/register"> Skapa konto </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
