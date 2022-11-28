import Image from 'next/image';
import styles from "./ProductCard.module.scss";

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
}: CardProps) => (
  <div className={styles.cardContainer} onClick={onClick}>
    <div className={styles.cardPicture}>
      <Image src={image} alt="image" layout="fill" objectFit="cover" />
    </div>
    <div className={styles.cardDescription}>
      <h2 className={styles.cardPrice}>{price}</h2>
      <h1 className={styles.cardTitle}>{title}</h1>
    </div>
  </div>
);
