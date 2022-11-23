import styles from "./ProductCard.module.scss";

export interface CardProps {
    image: string;
    price: string;
    title: string;
    id?: string;
}

export const ProductCard = ({image, price, title, id} : CardProps) => (
    <div className={styles.cardContainer}>
        <img src={image} alt="" className={styles.cardPicture} />
        <div className={styles.cardDescription}>
            <h2 className={styles.cardPrice}>{price}</h2>
            <h1 className={styles.cardTitle}>{title}</h1>
        </div>
    </div>
  );