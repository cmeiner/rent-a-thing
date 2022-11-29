import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/Logo.svg";
import styles from "./Header.module.scss";



export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logotype" />
      </div>
      <div className={styles.headerTextContainer}>
        <Link href={'/'}>
          <h1 className={styles.headerText}>Rent-a-thing</h1>
        </Link>
      </div>
      <div className={styles.iconContainer}>
        <AccountCircleIcon className={styles.icon} />
      </div>
    </div>
  );
};
