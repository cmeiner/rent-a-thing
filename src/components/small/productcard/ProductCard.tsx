import Image from 'next/image';
import styles from './ProductCard.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from 'next/image';
import { title } from 'process';
import { useState } from 'react';
import Link from 'next/link';

export interface CardProps {
  image: string;
  price: string;
  title: string;
  id?: string;
  onClick?: () => void;
}

export const ProductCard = ({
  image,
  price,
  title,
  id,
  onClick,
}: CardProps) => {
  const [isFavClicked, setFavClicked] = useState(false);

  const handleFav = () => {
    setFavClicked((prevState) => !prevState);
  };

  return (
    <div className={styles.cardContainer}>
      <div onClick={handleFav} className={styles.favIcon}>
        {isFavClicked ? <FavoriteBorderIcon /> : <FavoriteIcon />}
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
};
