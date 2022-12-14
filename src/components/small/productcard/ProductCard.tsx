import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useState } from 'react';
import { db } from '../../../firebase/Firebase';
import { GetUser } from '../../../utils/Hooks';
import styles from './ProductCard.module.scss';

export interface CardProps {
  image: string;
  price: string;
  title: string;
  id?: string;
  onClick?: () => void;
  available?: boolean;
  fav?: boolean;
  location: string;
}

export const ProductCard = ({
  image,
  price,
  title,
  available,
  onClick,
  id,
  location
}: CardProps) => {
  const [isFav, setIsFav] = useState(false);
  const { user } = GetUser();

  const handleFav = () => {
    setIsFav((prevState) => !prevState);
    const favorite = doc(db, `users/${user.id}`);
    isFav
      ? updateDoc(favorite, {
          favorites: arrayRemove(id),
        })
      : updateDoc(favorite, {
          favorites: arrayUnion(id),
        });
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.rentContainer}>
        <div className={styles.availableContainer}>
          {available ? 'Tillgänglig ' : 'Uthyrd '}
          <FiberManualRecordIcon
            className={available ? styles.available : styles.notAvailable}
          />
        </div>
        {user.id ? (
          <div onClick={handleFav} className={styles.favIcon}>
            {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
