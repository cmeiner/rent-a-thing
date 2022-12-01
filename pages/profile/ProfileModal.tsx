import { Modal, ModalOverlay } from '@chakra-ui/react';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import styles from './ProfilePage.module.scss';

interface ModalProps {
  visible: boolean;
  closeModal: () => void;
}

export const ProfileModal = ({ visible, closeModal }: ModalProps) => {
  return (
    <>
      <Modal onClose={() => closeModal()} isOpen={visible}>
        <ModalOverlay />
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            <h1>Uppdatera profilbild</h1>
            <InputField placeholder="Bild URL" type="text" />
            <PrimaryButton text="Uppdatera" submit />
          </form>
      </Modal>
    </>
  );

  // <h1>Uppdatera profilbild</h1>
  // <form
  //   className={styles.form}
  //   onSubmit={(e) => {
  //     e.preventDefault();
  //     closeModal();
  //   }}
  // >
  //     <InputField placeholder="Bild URL" type="text" />
  //     <PrimaryButton text="Uppdatera" submit />
  // </form>
};
