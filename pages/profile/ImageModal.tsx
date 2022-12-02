import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { getAuth, updateProfile } from 'firebase/auth';
import { FC, FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import styles from './ProfilePage.module.scss';

interface Props {
  visible: boolean;
  close: () => void;
}

export const ImageModal: FC<Props> = ({ visible, close }) => {
  const { setPhoto } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState('');

  const handleUpdateProfilePic = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser!, { photoURL: photoURL })
      .then(() => {
        setPhoto(photoURL);
        setPhotoURL('');
      })
      .catch((error) => {
        console.error(error.message);
      });
    close();
  };

  return (
    <Modal isOpen={visible} onClose={close} isCentered size='fit'>
      <ModalOverlay backdropFilter="blur(20px)" filter="grayscale(1)" />
      <ModalContent className={styles.content} w='fit-content'>
        <form
          className={styles.form}
          onSubmit={(e) => handleUpdateProfilePic(e)}
        >
          <h1>Uppdatera profilbild</h1>
          <InputField
            placeholder="Bild URL"
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <PrimaryButton text="Uppdatera" submit />
        </form>
      </ModalContent>
    </Modal>
  );
};
