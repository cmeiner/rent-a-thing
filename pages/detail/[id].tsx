import { NextPage } from "next";
import Image from 'next/image';
import { useRouter } from "next/router";
import { Header } from "../../src/components/big/header/Header";
import { PrimaryButton } from "../../src/components/small/primarybtn/PrimaryBtn";
import { PostProps, useFetch } from "../../src/utils/Hooks";
import styles from "./DetailPage.module.scss";

const Details: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { response } = useFetch("posts", id);
  const post = { ...(response as unknown as PostProps) };

  return (
    <>
      <Header />
      <div className={styles.productPage}>
        <div className={styles.productCard}>
          <div className={styles.imageSection}>
            <h1 className={styles.productTitle}>{post.title}</h1>
            <div className={styles.productImage}>
            <Image src={post.img as string} alt="image" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.productDesc}>{post.desc}</h2>
            <div className={styles.descHeader}>
              <h2 className={styles.productPrice}>{post.price}</h2>
              {/* <h2>{response.category}</h2> */}
            </div>
          </div>
        </div>
        <div className={styles.buttonSection}>
          <PrimaryButton
            onClick={() => console.log("asd")}
            text="Rent-this-thing"
            submit
          />
        </div>
      </div>
    </>
  );
};

export default Details;
