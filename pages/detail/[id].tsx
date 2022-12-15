import { useToast } from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Header } from '../../src/components/big/header/Header';
import { Slider } from '../../src/components/big/sliderbtn/Slider';
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
  const [switchState, setSwitchState] = useState(false);

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
      onCloseComplete: router.back,
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
        <div className={styles.productContainer}>
          <div className={styles.nav}>
            <KeyboardBackspaceIcon
              className={styles.icon}
              onClick={() => router.back()}
            />
          </div>
          <div className={styles.productContent}>
            <div className={styles.imageContainer}>
              <div className={styles.productImage}>
                <Image
                  src={productData.img as string}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className={styles.aside}>
              <div className={styles.productNav}>
                <h1>{productData.title}</h1>
                <Slider
                  state={switchState}
                  onClick={() => setSwitchState(!switchState)}
                  primary="Produktinfo"
                  secondary="Beskrivning"
                />
              </div>
              <div className={styles.textContainer}>
                {!switchState ? (
                  <>
                    <div className={styles.text}>
                      <h3 className={styles.title}>Kategori:</h3>
                      <p>{productData.category}</p>
                    </div>
                    <div className={styles.text}>
                      <h3 className={styles.title}>Finns i stadsdel:</h3>
                      <p>{productData.location}</p>
                    </div>
                    <div className={styles.text}>
                      <h3 className={styles.title}>Uthyrd:</h3>
                      <h1 className={styles.data}>
                        {productData.timesRented} gånger
                      </h1>
                    </div>

                    <div className={styles.link}>
                      <div className={styles.text}>
                        <h3 className={styles.title}>Hyrs ut av:</h3>
                        <h1 className={styles.data}>
                          {userData.displayName}
                          <AccountCircleIcon className={styles.icon} />
                        </h1>
                      </div>
                      <Link href={`/userprofile/${productData.postedBy}`}>
                        <p>Se fler annonser från {userData.displayName}</p>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className={styles.desc}>
                    <h3>Beskrivning</h3>
                    <p>
                      {productData.desc.length
                        ? productData.desc
                        : 'Produkten saknar beskrivning...'}
                    </p>
                  </div>
                )}
                <hr />
                <div className={styles.submit}>
                  {user.id ? (
                    <>
                      <div className={styles.formContainer}>
                        {productData.available ? (
                          <>
                            <p>Vill du hyra denna produkt?</p>
                            <div className={styles.text}>
                              <h3 className={styles.title}>Pris per dag:</h3>
                              <h1 className={styles.data}>
                                {productData.price} :-
                              </h1>
                            </div>
                            <form onSubmit={HandleSubmit}>
                              <FilterDay onChange={HandleOption} />
                              {productData.postedBy !== user.id ? (
                                <PrimaryButton text="Rent-this-thing" submit />
                              ) : (
                                <PrimaryButton
                                  text="Du kan inte hyra din egen annons"
                                  disabled
                                />
                              )}
                            </form>
                          </>
                        ) : (
                          <p className={styles.infoText}>
                            Produkten är uthyrd för tillfället.
                          </p>
                        )}
                      </div>
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
    </>
  );
};

export default Details;
