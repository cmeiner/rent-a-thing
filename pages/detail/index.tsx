import { NextPage } from "next";
import { Header } from "../../src/components/big/header/Header";
import { PrimaryButton } from "../../src/components/small/primarybtn/PrimaryBtn";
import styles from "./DetailPage.module.scss";

const Details: NextPage = () => {
  // const product = {
  //   title: "Partytält",
  //   image: "https://picsum.photos/900/900",
  //   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta quas illum laudantium dolor amet, fugiat non cupiditate eos quam in! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta quas illum laudantium dolor amet, fugiat non cupiditate eos quam in.",
  //   price: "Från 300kr / dygn",
  //   category: "Utomhus",
  // };

  return (
    <>
      <Header />
      <div className={styles.productPage}>
        <div className={styles.productCard}>
          <div className={styles.imageSection}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <img src={product.image} className={styles.productImage} />
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.productDesc}>{product.desc}</h2>
            <div className={styles.descHeader}>
              <h2 className={styles.productPrice}>{product.price}</h2>
              <h2>{product.category}</h2>
            </div>
          </div>
        </div>
        <div className={styles.buttonSection}>
          <PrimaryButton
            onClick={() => console.log("asd")}
            text="Rent-this-thing"
          />
        </div>
      </div>
    </>
  );
};

export default Details;
