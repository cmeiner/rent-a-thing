import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Header } from '../../src/components/big/header/Header';
import { ProductCard } from '../../src/components/small/productcard/ProductCard';
import { PostedByProps, ProductProps, useFetch } from '../../src/utils/Hooks';
import styles from './userprofile.module.scss';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<PostedByProps>();
  const userId = router.query.id as string;
  const { response } = useFetch('posts', undefined, userId);

  useEffect(() => {
    if (response.postedBy.length) {
      response.postedBy.map((data, index) => {
        if (index === 0) {
          setUser(data);
        }
      });
    }
  }, [response]);

  return (
    <>
      <Header />
      <div className={styles.wallpaper}>
        <h1 className={styles.title}>Profil</h1>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            alt="profile-picture"
            src={user?.photoURL || ''}
            width={160}
            height={160}
          />
        </div>
        <h1 className={styles.title}>{user?.displayName}</h1>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.productGrid}>
          {response.product.map((post: ProductProps, key) => {
            return (
              <Link href={'/detail/' + post.id} key={key}>
                <ProductCard
                  title={post.title}
                  price={post.price}
                  image={post.img}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
