import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
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
      <Modal isOpen={visible} onClose={closeModal} isCentered>
        <ModalOverlay
          onClick={closeModal}
          backdropFilter="blur(20px)"
          zIndex={4}
          className={styles.overlay}
        >
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              console.log('asd');
            }}
          >
            <ModalContent className={styles.content} zIndex={3}>
              <h1>Uppdatera profilbild</h1>
              <InputField placeholder="Bild URL" type="text" />
              <PrimaryButton text="Uppdatera" submit />
            </ModalContent>
          </form>
        </ModalOverlay>
      </Modal>
    </>
  );
};
