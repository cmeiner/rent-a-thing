import { useToast } from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Header } from '../../src/components/big/header/Header';
import { FilterDay } from '../../src/components/small/filterDay/FilterDay';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import {
  GetUser,
  ProductProps,
  useFetch,
  usePost,
  UserProps
} from '../../src/utils/Hooks';
import styles from './DetailPage.module.scss';

const Details: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { response: productRes } = useFetch('posts', id);

  const productData = { ...(productRes as unknown as ProductProps) };

  // const requestData = { ...(productRes as unknown as RequestProps) };

  const { response: userRes } = useFetch('users', productData.postedBy);
  const userData = { ...(userRes as unknown as UserProps) };
  const [days, setDays] = useState<undefined | number>();
  const toast = useToast();

  const { user } = GetUser();

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usePost('requests', {
      productData,
      days: days,
      requestedBy: user,
      connectedOwnersId: userData.id,
    });
    toast({
      title: 'Förfrågan skickad',
      duration: 2000,
      status: 'success',
      onCloseComplete: router.back
    });
  };

  console.log(userData);

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
              <KeyboardBackspaceIcon
                className={styles.goBack}
                onClick={() => router.back()}
              />{' '}
              {productData.title}
            </h1>
            <div className={styles.productImage}>
              <Image
                src={productData.img as string}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.textSection}>
            <div className={styles.productDesc}>
              <h3>{productData.desc}</h3>
              <Link href={`/userprofile/${productData.postedBy}`}>
                <h3 style={{ cursor: 'pointer' }}>
                  Hyrs ut av: {userData?.displayName}
                  <AccountCircleIcon className={styles.icon} />
                </h3>
              </Link>
            </div>
            <div className={styles.descHeader}>
              <h2 className={styles.productDataPrice}>
                Pris per dygn {productData.price}:-
              </h2>
              <h2>Kategori: {productData.category}</h2>
            </div>
            <p>
              Denna produkt har varit uthyrd antal gånger:{' '}
              {productData.timesRented}
            </p>
          </div>
        </div>
        <div className={styles.buttonSection}>
          {user.id ? (
            <>
              {!productData.available ? (
                <div className={styles.loginUser}>
                  <p className={styles.infoText}>
                    Produkten är uthyrd för tillfället.
                  </p>
                </div>
              ) : (
                <form onSubmit={HandleSubmit}>
                  <FilterDay onChange={HandleOption} />
                  <PrimaryButton text="Rent-this-thing" submit />
                </form>
              )}
            </>
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
