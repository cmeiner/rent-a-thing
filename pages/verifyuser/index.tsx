import { getAuth, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { FilesInput } from '../../src/components/small/filesInput/FilesInput';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import styles from './VerifyPage.module.scss';
import { storage } from '../../src/firebase/Firebase';

import { v4 } from 'uuid';

const VerifyUser: NextPage = () => {
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState();
  const [data, setData] = useState({ displayName: '', photoURL: '' });
  const [error, setError] = useState('');

  const { setProfile } = useContext(AuthContext);

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setData({ ...data, photoURL: url });
      });
    });
    console.log(data);
  }, [imageUpload]);

  const handleVerify = (e: any) => {
    e.preventDefault();
    const auth = getAuth();

    updateProfile(auth.currentUser!, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then((currentUser) => {
        const user = currentUser;
        setProfile(data);
        router.push('/profile');
        setData({
          displayName: '',
          photoURL: '',
        });
      })
      .catch((error) => {
        setError(error.message);
      });
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
          <FilesInput
            onChange={(e) => setImageUpload(e.currentTarget.files[0])}
            type="file"
          />
          <PrimaryButton
            text="Slutför"
            submit={true}
            disabled={!data.photoURL}
          />
          <div style={{ color: 'white' }}>{error}</div>
        </form>
      </div>
    </>
  );
};

export default VerifyUser;
