import styles from './Header.module.scss';
import logo from '../../../assets/Logo.svg';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logo" />
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
