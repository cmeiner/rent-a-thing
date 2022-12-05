import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { FilterDay } from '../../src/components/small/filterDay/FilterDay';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import {
  PostedByProps,
  ProductProps,
  useFetch,
  usePost,
} from '../../src/utils/Hooks';
import styles from './DetailPage.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Details: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { response } = useFetch('posts', id);

  const product = { ...(response.product as unknown as ProductProps) };
  const postedBy = { ...(response.postedBy as unknown as PostedByProps) };

  const [days, setDays] = useState<undefined | number>();

  const { currentUser } = useContext(AuthContext);
  const user = { ...(currentUser as PostedByProps) };

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usePost('requests', {
      product,
      days: days,
      postedBy: user,
      connectedOwnersId: postedBy.id,
    });
    toast.success('Förfrågan skickad', {
      position: 'bottom-center',
    });
  };

  const HandleOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setDays(
      isNaN(value) !== true && value >= 1 && value <= 7 ? value : undefined
    );
  };

  return (
    <>
      <Header />
      <div className={styles.productPage}>
        <div className={styles.productCard}>
          <div className={styles.imageSection}>
            <h1 className={styles.productTitle}>
              {' '}
              <KeyboardBackspaceIcon
                className={styles.goBack}
                onClick={() => router.back()}
              />{' '}
              {product.title}
            </h1>
            <div className={styles.productImage}>
              <Image
                src={product.img as string}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.textSection}>
            <div className={styles.productDesc}>
              <h3>{product.desc}</h3>
              <Link href={`/userprofile/${postedBy?.id}`}>
                <h3 style={{ cursor: 'pointer' }}>
                  Hyrs ut av: {postedBy?.displayName}{' '}
                  <AccountCircleIcon className={styles.icon} />{' '}
                </h3>
              </Link>
            </div>
            <div className={styles.descHeader}>
              <h2 className={styles.productPrice}>
                Pris per dygn {product.price}:-
              </h2>
              <h2>Kategori: {product.category}</h2>
            </div>
          </div>
        </div>

        <div className={styles.buttonSection}>
          {user.id ? (
            <form onSubmit={HandleSubmit}>
              <FilterDay onChange={HandleOption} />
              <PrimaryButton
                onClick={() => console.log('asd')}
                text="Rent-this-thing"
                submit
              />
              <ToastContainer />
            </form>
          ) : (
            <div className={styles.loginUser}>
              <p className={styles.infoText}>
                Vänligen logga in för att hyra denna produkt
              </p>
              <Link href={'/login'}>
                <p className={styles.link}>Logga in</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
