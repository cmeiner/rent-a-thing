import styles from "./ProductCard.module.scss";

export interface CardProps {
  image?: string;
  price?: string;
  title?: string;
  id?: string;
  onClick?: () => void
}

export const ProductCard = ({ image, price, title, id, onClick }: CardProps) => (
  <div className={styles.cardContainer} onClick={onClick}>
    <img src={image} alt="image" className={styles.cardPicture} />
    <div className={styles.cardDescription}>
      <h2 className={styles.cardPrice}>{price}</h2>
      <h1 className={styles.cardTitle}>{title}</h1>
    </div>
  </div>
);
