import { getAuth, signOut } from 'firebase/auth';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { Slider } from '../../src/components/big/sliderbtn/Slider';
import { AddButton } from '../../src/components/small/addbtn/AddBtn';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { ProductCard } from '../../src/components/small/productcard/ProductCard';
import { PostProps, useFetch, UserProps } from '../../src/utils/Hooks';
import styles from './ProfilePage.module.scss';

const ProfilePage: NextPage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };
  const [contentSwitch, setContentSwitch] = useState(false);
  const squid =
    'https://static.wikia.nocookie.net/spongebob/images/9/96/The_Two_Faces_of_Squidward_174.png/revision/latest?cb=20200923005328';

  const { response } = useFetch('posts', undefined, user.id);

  // only for dev
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className={styles.wallpaper}>
        <h1 className={styles.title}>Profil</h1>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            alt="profile-picture"
            src={squid}
            width={160}
            height={160}
          />
        </div>

        <h1 className={styles.title}>
          {user.displayName ? user.displayName : user.email}
        </h1>
      </div>

      <div className={styles.navContainer}>
        <Link href="/products">
          <a className={styles.link}>
            <h3 className={styles.text}>Ny annons</h3>
            <AddButton />
          </a>
        </Link>

        <div>
          <Slider
            onClick={() => setContentSwitch(!contentSwitch)}
            primary="Annonser"
            secondary="Förfrågningar"
            state={contentSwitch}
          />
        </div>
      </div>

      <PrimaryButton
        submit={false}
        text="logga ut *enbart dev*"
        onClick={handleSignOut}
      />

      {contentSwitch ? (
        <div>förfrågningar</div>
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.productGrid}>
            {response.map((post: PostProps, key) => {
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
      )}
    </div>
  );
};

export default ProfilePage;
