import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { FilterDay } from '../../src/components/small/filterDay/FilterDay';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { PostProps, useFetch, usePost, UserProps } from '../../src/utils/Hooks';
import styles from './DetailPage.module.scss';



const Details: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { response } = useFetch('posts', id);
  const post = { ...(response as unknown as PostProps) };

  const [days, setDays] = useState<undefined | number>();

  const { currentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usePost('requests', {
      post,
      days: days,
      postedBy: user,
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
            
            <h1 className={styles.productTitle}> <KeyboardBackspaceIcon
              className={styles.goBack}
              onClick={() => router.back()}
            /> {post.title}</h1>
            <div className={styles.productImage}>
              <Image
                src={post.img as string}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.productDesc}>{post.desc}</h2>
            <div className={styles.descHeader}>
              <h2 className={styles.productPrice}>
                Pris per dygn {post.price}:-
              </h2>
              <h2>Kategori: {post.category}</h2>
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
