import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from "./RequestCard.module.scss";

export interface RequestCard {
  image: string;
  renter: string;
  item: string;
  accept: () => void;
  decline: () => void;
}

export const RequestCard = ({ image, renter, item, decline, accept }: RequestCard) => (
  <div className={styles.requestContainer}>
    <div className={styles.requestDescription}>
      <h2 className={styles.requestPrice}>{renter} vill hyra:</h2>
      <h2 className={styles.requestTitle}>{item}</h2>
    </div>
    <img src={image} alt="image" className={styles.requestPicture} />
    <div className={styles.requestAction}>
        <CheckCircleIcon onClick={accept} className={styles.checkIcon} />
        <CancelIcon onClick={decline} className={styles.cancelIcon}/>
    </div>
  </div>
);
