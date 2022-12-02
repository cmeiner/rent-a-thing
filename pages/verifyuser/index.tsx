import { getAuth, updateProfile } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import styles from './VerifyPage.module.scss';


const VerifyUser: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ displayName: '', photoURL: '' });
  const [error, setError] = useState('');

  const { setProfile } = useContext(AuthContext)
  
  const handleVerify = (e: any) => {
    e.preventDefault();
    const auth = getAuth();

    updateProfile(auth.currentUser!, 
      {displayName: data.displayName, photoURL: data.photoURL})
      .then((currentUser) => {
        const user = currentUser;
        setProfile(data)
        router.push('/profile')
        setData({
          displayName: '', photoURL: ''
        })
      })
      .catch((error) => {
        setError(error.message);})
  };

  return (
    <>
      <Header />
      <div className={styles.verifyPage}>
        <form onSubmit={handleVerify} className={styles.verifyForm}>
          <div className={styles.formHeader}>
            <h2 className={styles.verifyTitle}>Slutför registrering</h2>
            <hr />
            <h2 className={styles.verifyTitle}>Uppdatera användarnamn</h2>
          </div>
          <InputField
            value={data.displayName}
            onChange={(e) => setData({ ...data, displayName: e.target.value })}
            placeholder="Användarnamn"
            type="text"
          />
          <InputField
            value={data.photoURL}
            onChange={(e) => setData({ ...data, photoURL: e.target.value })}
            placeholder="URL till profilbild"
            type="text"
          />
          <PrimaryButton text="Slutför" submit={true} />
          <div style={{ color: 'white' }}>{error}</div>
        </form>
      </div>
    </>
  );
};

export default VerifyUser;
