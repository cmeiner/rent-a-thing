import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Header } from '../../src/components/big/header/Header';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { auth } from '../../src/firebase/Firebase';
import styles from './LoginPage.module.scss';
import { AuthContext } from '../../src/auth/AuthContext';

const Login: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('inloggad', user);
        router.push('/profile');
        setData({
          username: '',
          email: '',
          password: '',
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className={styles.loginPage}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.formHeader}>
            <KeyboardBackspaceIcon
              className={styles.goBack}
              onClick={() => router.back()}
            />
            <h2 className={styles.loginTitle}>Logga in</h2>
          </div>
          <InputField
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder={'Email'}
            type={'text'}
          />
          <InputField
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder={'Password'}
            type={'text'}
          />
          <PrimaryButton text="Logga in" submit={true} />
          <div style={{ color: 'white' }}>{error}</div>
          <p className={styles.toRegister}>
            <Link href="/register"> Skapa konto </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
