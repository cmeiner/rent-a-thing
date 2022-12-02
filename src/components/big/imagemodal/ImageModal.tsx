import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AuthContext } from '../../../auth/AuthContext';
import { storage } from '../../../firebase/Firebase';
import { FilesInput } from '../../small/filesInput/FilesInput';
import { InputField } from '../../small/inputfield/InputField';
import { PrimaryButton } from '../../small/primarybtn/PrimaryBtn';
import styles from './ImageModal.module.scss';

interface Props {
  visible: boolean;
  close: () => void;
}

export const ImageModal: FC<Props> = ({ visible, close }) => {
  const [imageUpload, setImageUpload] = useState();
  const [photoURL, setPhotoURL] = useState('');
  const { setProfile } = useContext(AuthContext);

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPhotoURL(url);
      });
    });
  }, [imageUpload]);

  const handleUpdateProfilePic = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser!, { photoURL: photoURL })
      .then(() => {
        setProfile(photoURL);
        setPhotoURL('');
      })
      .catch((error) => {
        console.error(error.message);
      });
    close();
  };

  return (
    <Modal isOpen={visible} onClose={close} isCentered size="fit">
      <ModalOverlay backdropFilter="blur(20px)" filter="grayscale(1)" />
      <ModalContent className={styles.content} w="fit-content">
        <form
          className={styles.form}
          onSubmit={(e) => handleUpdateProfilePic(e)}
        >
          <h1>Uppdatera profilbild</h1>
          <FilesInput
            onChange={(e) => setImageUpload(e.currentTarget.files[0])}
            type="file"
          />
          <PrimaryButton disabled={!photoURL} text="Uppdatera" submit />
        </form>
      </ModalContent>
    </Modal>
  );
};
