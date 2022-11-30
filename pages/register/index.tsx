import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Header } from '../../src/components/big/header/Header';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { auth } from '../../src/firebase/Firebase';
import styles from './RegisterPage.module.scss';

const Register: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleCreateUser = (e: any) => {
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
        setError(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Skapa konto</h1>
        <form onSubmit={handleCreateUser} className={styles.formStyle}>
          <InputField
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder='Email'
            type='text'
          />
          <InputField
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder='Password'
            type='text'
          />
          <div className={styles.button}>
            <PrimaryButton submit={true} text="Skapa konto" />
          </div>
          <div style={{ color: 'white' }}>{error}</div>
        </form>
        <p className={styles.link}>
          <Link href="/login">Logga in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
