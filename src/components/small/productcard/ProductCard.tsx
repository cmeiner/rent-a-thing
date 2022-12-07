import Image from 'next/image';
import styles from './ProductCard.module.scss';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export interface CardProps {
  image: string;
  price: string;
  title: string;
  id?: string;
  onClick?: () => void;
  available?: boolean;
}

export const ProductCard = ({
  image,
  price,
  title,
  id,
  available,
  onClick,
}: CardProps) => (
  <div className={styles.cardContainer} onClick={onClick}>
    <div className={styles.rentContainer}>
      <p>{available ? 'Tillgänglig' : 'Uthyrd'}</p>
      <FiberManualRecordIcon
        className={available ? styles.available : styles.notAvailable}
      />
    </div>
    <div className={styles.cardPicture}>
      <Image src={image} alt="image" layout="fill" objectFit="cover" />
    </div>
    <div className={styles.cardDescription}>
      <h2 className={styles.cardPrice}>Pris {price}:-</h2>
      <h1 className={styles.cardTitle}>{title}</h1>
    </div>
  </div>
);
