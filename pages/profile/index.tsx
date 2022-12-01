import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { Slider } from '../../src/components/big/sliderbtn/Slider';
import { AddButton } from '../../src/components/small/addbtn/AddBtn';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { ProductCard } from '../../src/components/small/productcard/ProductCard';
import { RequestCard } from '../../src/components/small/requestcard/RequestCard';
import { db } from '../../src/firebase/Firebase';
import { GetUser, PostProps, useFetch } from '../../src/utils/Hooks';
import { ImageModal } from './ImageModal';
import styles from './ProfilePage.module.scss';

const ProfilePage: NextPage = () => {
  const { user } = GetUser();
  const { response } = useFetch('posts', undefined, user.id);
  const [photoURL, setPhotoURL] = useState('');
  const { setPhoto, setCurrentUser } = useContext(AuthContext);
  const [contentSwitch, setContentSwitch] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    if (user.id === undefined) {
      return;
    }

    const q = query(
      collection(db, 'requests'),
      where('data.post.postedBy.id', '==', user.id)
    );

    getDocs(q).then((res) => {
      const requests = res.docs.map((doc) => doc.data().data);
      setRequests(requests);
    });
  }, [user.id]);

  const closeModal = () => {
    setVisible(false)
  }

  return (
    <>
      <Header />
      <ImageModal close={closeModal} visible={visible} />

      <div className={styles.wallpaper}>
        <h1 className={styles.title}>Profil</h1>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            alt="profile-picture"
            src={user.photoURL}
            width={160}
            height={160}
            onClick={() => {
              setVisible((prevState) => !prevState);
            }}
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
        <div className={styles.productContainer}>
          <div className={styles.productGrid}>
            {requests.map((request: any, key) => (
              <RequestCard
                item={request.post.title}
                renter={request.postedBy.displayName}
                image={request.post.img}
                key={key}
                accept={() => console.log('accept')}
                decline={() => console.log('decline')}
              />
            ))}
          </div>
        </div>
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
    </>
  );
};

export default ProfilePage;
