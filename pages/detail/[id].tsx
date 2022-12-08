import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../src/components/big/header/Header';
import { FilterDay } from '../../src/components/small/filterDay/FilterDay';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import {
  GetUser,
  ProductProps,
  useFetch,
  usePost,
  UserProps,
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

  const { user } = GetUser();

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usePost('requests', {
      productData,
      days: days,
      requestedBy: user,
      connectedOwnersId: userData.id,
    });
    toast.success('Förfrågan skickad', {
      position: 'bottom-center',
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
          <div className={styles.aside}>
            <div className={styles.navigationContainer}>
              <KeyboardBackspaceIcon
                className={styles.arrow}
                onClick={() => router.back()}
              />
            </div>
            <div className={styles.productImage}>
              <Image
                src={productData.img as string}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{productData.title}</h1>
            </div>
          </div>
          <div className={styles.textSection}>
            <div className={styles.infoContainer}>
              <div className={styles.infoContent}>
                <div className={styles.info}>
                  <div className={styles.text}>
                    <p>Kategori:</p>
                    <h2>{productData.category}</h2>
                  </div>
                  <div className={styles.text}>
                    <p>Pris per dag:</p>
                    <h2>{productData.price}:-</h2>
                  </div>
                </div>
                <div className={styles.subInfo}>
                  <div className={styles.test}>
                    <div className={styles.text}>
                      <p>Beskrivning</p>

                      <h2>{productData.desc}</h2>
                    </div>
                    <div className={styles.testtwo}>
                      <Link href={`/userprofile/${productData.postedBy}`}>
                        <a className={styles.postedBy}>
                          <p>Hyrs ut av: </p>

                          <h3>
                            {userData?.displayName}
                            <AccountCircleIcon className={styles.icon} />
                          </h3>
                        </a>
                      </Link>
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
                                <ToastContainer />
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
