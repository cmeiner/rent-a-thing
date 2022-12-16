import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AuthContext } from '../../src/auth/AuthContext';
import { FilesInput } from '../../src/components/filesInput/FilesInput';
import { Header } from '../../src/components/header/Header';
import { InputField } from '../../src/components/inputfield/InputField';
import { PrimaryButton } from '../../src/components/primarybtn/PrimaryBtn';
import { storage } from '../../src/firebase/Firebase';
import { usePost } from '../../src/utils/Hooks';
import styles from './VerifyPage.module.scss';

const VerifyUser: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState();
  const [data, setData] = useState({
    displayName: '',
    photoURL: '',
  });
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpload]);

  const HandleVerify = (e: any) => {
    e.preventDefault();
    usePost('users', data);

    updateProfile(auth.currentUser!, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        setProfile(data);
        router.push('/profile');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className={styles.verifyPage}>
        <form onSubmit={HandleVerify} className={styles.verifyForm}>
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
          <PrimaryButton text="Slutför" submit disabled={!data.photoURL} />
          <div style={{ color: 'white' }}>{error}</div>
        </form>
      </div>
    </>
  );
};

export default VerifyUser;
