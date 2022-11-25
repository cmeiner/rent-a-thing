import { NextPage } from "next";
import styles from "./ProfilePage.module.scss"
import Image from "next/image";
import { Slider } from "../../src/components/big/sliderbtn/Slider";
import { useState } from "react";
import Link from "next/link";
import { AddButton } from "../../src/components/small/addbtn/AddBtn";
import { ProductCard } from "../../src/components/small/productcard/ProductCard";


const ProfilePage: NextPage = () => {
    const [contentSwitch, setContentSwitch] = useState(false)
const squid = "https://static.wikia.nocookie.net/spongebob/images/9/96/The_Two_Faces_of_Squidward_174.png/revision/latest?cb=20200923005328";

  return (
    <div>
         <div className={styles.wallpaper}>
               <h1 className={styles.title}>Profil</h1>
         </div>
     
    <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
    <Image className={styles.img} alt="profile-picture" src={squid} width={160} height={160}/>
        </div>

    <h1 className={styles.title}>William Saar</h1>

    </div>


<div className={styles.navContainer}>
<Link href="/products" className={styles.link}>
    <h3 className={styles.text}>Ny annons</h3>
    <AddButton />
</Link>

<div>
    <Slider onClick={() => setContentSwitch(!contentSwitch)} primary="Annonser" secondary="Förfrågningar" state={contentSwitch}/>
</div>
</div>

{contentSwitch ? 

<div>förfrågningar</div> 

: 

<div>
    <div className={styles.productContainer}>
        <ProductCard image={squid} price="10" title="bläckward" />
    <ProductCard image={squid} price="10" title="bläckward" />
    <ProductCard image={squid} price="10" title="bläckward" />
    <ProductCard image={squid} price="10" title="bläckward" />
    </div>
</div> 
}

</div>
  );
};

export default ProfilePage;