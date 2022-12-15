import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import styles from './RequestCard.module.scss';

export interface CardProps {
  image: string;
  renter: string;
  item: string;
  accept: () => void;
  decline: () => void;
}

export const RequestCard = ({
  image,
  renter,
  item,
  decline,
  accept,
}: CardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.rentContainer}>{renter} vill hyra:</div>
      <div className={styles.cardPicture}>
        <Image src={image} alt="image" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.statusContainer}>
        <h2>{item}</h2>
      </div>
      <div className={styles.requestAction}>
        <CheckCircleIcon onClick={accept} className={styles.checkIcon} />
        <CancelIcon onClick={decline} className={styles.cancelIcon} />
      </div>
    </div>
  );
};
