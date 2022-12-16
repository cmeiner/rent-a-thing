import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '../../src/components/big/header/Header';
import { ProductCard } from '../../src/components/small/productcard/ProductCard';
import { ProductProps, useFetch, UserProps } from '../../src/utils/Hooks';
import styles from './userprofile.module.scss';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const userId = router.query.id as string;

  const { response: userRes } = useFetch('users', userId);
  const userData = { ...(userRes as unknown as UserProps) };

  const { response: postRes } = useFetch('posts', undefined, userId);

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
            src={userData?.photoURL || ''}
            width={160}
            height={160}
          />
        </div>
        <h1 className={styles.title}>{userData?.displayName}</h1>
        <p className={styles.description}>{userData.description}</p>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.productGrid}>
          {postRes.map((postData: ProductProps, key) => {
            return (
              <Link href={'/detail/' + postData.id} key={key}>
                <ProductCard
                  title={postData.title}
                  price={postData.price}
                  image={postData.img}
                  location={postData.location}
                  available={postData.available}
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
