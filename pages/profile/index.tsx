import { useToast } from '@chakra-ui/react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { getAuth, signOut } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { EditProfileModal } from '../../src/components/big/editProfileModal/EditProfileModal';
import { Header } from '../../src/components/big/header/Header';
import { Slider } from '../../src/components/big/sliderbtn/Slider';
import { AddButton } from '../../src/components/small/addbtn/AddBtn';
import { ProductCard } from '../../src/components/small/productcard/ProductCard';
import { RequestCard } from '../../src/components/small/requestcard/RequestCard';
import { TestCard } from '../../src/components/small/testcard/TestCard';
import { db } from '../../src/firebase/Firebase';
import {
  GetUser,
  ProductProps,
  RequestProps,
  useFetch,
} from '../../src/utils/Hooks';
import styles from './ProfilePage.module.scss';

const ProfilePage: NextPage = () => {
  const { user } = GetUser();
  const { response } = useFetch('posts', undefined, user.id);
  const toast = useToast();
  const [updateReqFetch, setUpdateReqFetch] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [contentSwitch, setContentSwitch] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState(user.description);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch((error) => {
        console.error(error.message);
      });
    Router.push('/');
  };

  const handleAcceptRequest = (request: RequestProps) => {
    const testTimesRented = request.productData.timesRented + 1;

    const updatePostAvailable = doc(db, `posts/${request.productData.id}`);
    updateDoc(updatePostAvailable, {
      available: false,
      timesRented: testTimesRented,
    }).then(() => {
      deleteDoc(doc(db, `requests/${request.id}`));
      setUpdateReqFetch(!updateReqFetch);
      toast({
        title: 'Förfrågan godkänd.',
        duration: 2000,
        status: 'success',
      });
    });
  };

  const handleDeclineRequest = (request: RequestProps) => {
    deleteDoc(doc(db, `requests/${request.id}`));
    setUpdateReqFetch(!updateReqFetch);
    toast({
      title: 'Förfrågan nekad.',
      duration: 2000,
      status: 'info',
    });
  };

  useEffect(() => {
    if (user.id === undefined) {
      return;
    }

    const q = query(
      collection(db, 'requests'),
      where('connectedOwnersId', '==', user.id)
    );

    getDocs(q).then((res) => {
      setRequests(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, [user.id, updateReqFetch, !updateReqFetch]);

  const requestFilter = (requests: RequestProps) =>
    requests.productData.available === true;

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className={styles.profileContainer}>
      <Header />
      <EditProfileModal
        close={closeModal}
        visible={visible}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <div className={styles.wallpaper} />
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          {user.photoURL ? (
            <div className={styles.imgContent}>
              <Image
                className={styles.img}
                alt="profile-picture"
                src={user.photoURL}
                width={160}
                height={160}
              />
              <div
                onClick={() => {
                  setVisible((prevState) => !prevState);
                }}
                className={styles.iconContainer}
              >
                <div className={styles.icon}>
                  <ModeEditOutlineOutlinedIcon />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <h1 className={styles.title}>{user.displayName}</h1>
        {!user.description ? (
          <div className={styles.noDesc}>
            <p>Beskrivning saknas</p>
            <p>Tryck på din profilbild för att uppdatera din profil</p>
          </div>
        ) : (
          <div className={styles.descriptionContainer}>
            <pre className={styles.userDescription}>{user.description} </pre>
          </div>
        )}
      </div>
      <div className={styles.navContainer}>
        <Link href="/new">
          <a className={styles.link}>
            <h3 className={styles.text}>Ny annons</h3>
            <AddButton id="addProductButton" />
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
      {contentSwitch ? (
        <div className={styles.productContainer}>
          {requests.length > 0 ? (
            <div className={styles.productGrid}>
              {requests.filter(requestFilter).map((request: RequestProps) => (
                <TestCard
                  item={request.productData.title}
                  renter={request.requestedBy.displayName}
                  image={request.productData.img}
                  key={request.id}
                  accept={() => handleAcceptRequest(request)}
                  decline={() => handleDeclineRequest(request)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noRequests}>
              <p>Du har för närvanade inga förfrågningar</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.productGrid}>
            {response.map((post: ProductProps, key) => {
              return (
                <Link href={'/detail/' + post.id} key={key}>
                  <ProductCard
                    available={post.available}
                    title={post.title}
                    price={post.price}
                    image={post.img}
                    location={post.location}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <div className={styles.profileFooter}>
        <div
          className={styles.content}
          id="logOutButton"
          onClick={handleSignOut}
        >
          <h2 className={styles.text}>Logga ut</h2>
          <LogoutOutlinedIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
