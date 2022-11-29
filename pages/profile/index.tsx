import { NextPage } from "next";
import styles from "./ProfilePage.module.scss";
import Image from "next/image";
import { Slider } from "../../src/components/big/sliderbtn/Slider";
import { useContext, useState } from "react";
import Link from "next/link";
import { AddButton } from "../../src/components/small/addbtn/AddBtn";
import { ProductCard } from "../../src/components/small/productcard/ProductCard";
import { Header } from "../../src/components/big/header/Header";
import { PrimaryButton } from "../../src/components/small/primarybtn/PrimaryBtn";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../src/auth/AuthContext";
import { UserProps } from "../../src/utils/Hooks";

const ProfilePage: NextPage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };

  const [contentSwitch, setContentSwitch] = useState(false);
  const squid =
    "https://static.wikia.nocookie.net/spongebob/images/9/96/The_Two_Faces_of_Squidward_174.png/revision/latest?cb=20200923005328";

  // only for dev
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("utloggad");
        setCurrentUser({});
      })
      .catch((error) => {
        console.log(error.message);
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

        <h1 className={styles.title}>{user.email}</h1>
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
            <ProductCard image={squid} price="10" title="bläckward" />
            <ProductCard image={squid} price="10" title="bläckward" />
            <ProductCard image={squid} price="10" title="bläckward" />
            <ProductCard image={squid} price="10" title="bläckward" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
