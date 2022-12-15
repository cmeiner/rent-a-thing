import { Modal, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AuthContext } from '../../../auth/AuthContext';
import { db, storage } from '../../../firebase/Firebase';
import { GetUser } from '../../../utils/Hooks';
import { FilesInput } from '../../small/filesInput/FilesInput';
import { PrimaryButton } from '../../small/primarybtn/PrimaryBtn';
import { TextField } from '../../small/textfield/TextField';
import { Slider } from '../sliderbtn/Slider';
import styles from './EditProfileModal.module.scss';

interface Props {
  visible: boolean;
  close: () => void;
  value: string;
  onChange: (e: any) => void;
}

export const EditProfileModal: FC<Props> = ({
  visible,
  close,
  value,
  onChange,
}) => {
  const { user } = GetUser();
  const [contentSwitch, setContentSwitch] = useState(false);
  const { currentUser, setCurrentUser, setProfile } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [imageUpload, setImageUpload] = useState();
  const [photoURL, setPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    setIsLoading(true);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPhotoURL(url);
        setIsLoading(false);
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

  const handleUpdateDesc = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateUserDescription = doc(db, `users/${user.id}`);
    updateDoc(updateUserDescription, {
      description: description,
    });
    setDescription('');
    setCurrentUser({ ...currentUser, description });
    setProfile('');
    close();
  };

  return (
    <Modal isOpen={visible} onClose={close} isCentered size="fit">
      <ModalOverlay backdropFilter="blur(20px)" filter="grayscale(1)" />
      <ModalContent className={styles.content} w="fit-content">
        <Slider
          onClick={() => setContentSwitch(!contentSwitch)}
          primary="Profilbild"
          secondary="Biografi"
          state={contentSwitch}
        />
        {!contentSwitch ? (
          <form className={styles.form} onSubmit={handleUpdateProfilePic}>
            <h1>Uppdatera profilbild</h1>
            <FilesInput
              onChange={(e) => setImageUpload(e.currentTarget.files[0])}
              type="file"
            />

            {isLoading ? (
              <>
                <div className={styles.imgContainer}>
                  <p>Vald bild</p>

                  <div className={styles.imgContent}>
                    <div className={styles.skeleton}>
                      <Spinner
                        thickness="4px"
                        color="white"
                        speed="0.9s"
                        size="lg"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {photoURL ? (
                  <div className={styles.imgContainer}>
                    <p>Vald bild</p>

                    <div className={styles.imgContent}>
                      <Image
                        alt="profile-picture"
                        src={photoURL}
                        width={160}
                        height={160}
                      />
                    </div>
                  </div>
                ) : null}
              </>
            )}
            <PrimaryButton disabled={!photoURL} text="Uppdatera" submit />
          </form>
        ) : (
          <form
            id="descriptionForm"
            className={styles.form}
            onSubmit={handleUpdateDesc}
          >
            <h1>Ange en kort beskrivning av dig själv</h1>
            <p>{'(Detta kommer att visas i din profil)'}</p>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskrivning"
              id="description"
            />
            <PrimaryButton disabled={!description} text="Uppdatera" submit />
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
