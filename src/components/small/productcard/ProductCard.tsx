import Image from 'next/image';
import styles from './ProductCard.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { GetUser } from '../../../utils/Hooks';

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
  available,
  onClick,
}: CardProps) => {
  const [isFavClicked, setFavClicked] = useState(false);
  const { user } = GetUser();

  const handleFav = () => {
    setFavClicked((prevState) => !prevState);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.rentContainer}>
        <p>
          {available ? 'Tillgänglig' : 'Uthyrd'}{' '}
          <FiberManualRecordIcon
            viewBox="0 0 30 10"
            className={available ? styles.available : styles.notAvailable}
          />
        </p>
        {user.id ? (
          <div onClick={handleFav} className={styles.favIcon}>
            {isFavClicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
        ) : null}
      </div>
      <div className={styles.cardPicture} onClick={onClick}>
        <Image src={image} alt="image" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.cardDescription} onClick={onClick}>
        <h2 className={styles.cardPrice} onClick={onClick}>
          Pris {price}:-
        </h2>
        <h1 className={styles.cardTitle} onClick={onClick}>
          {title}
        </h1>
      </div>
    </div>
  );
};
