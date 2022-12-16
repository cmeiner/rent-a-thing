import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/Logo.svg';
import { GetUser } from '../../utils/Hooks';
import styles from './Header.module.scss';

export const Header = () => {
  const { user } = GetUser();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logo" />
      </div>
      <div className={styles.headerTextContainer}>
        <Link href={'/'}>
          <h1 id="testID" className={styles.headerText}>
            Rent-a-thing
          </h1>
        </Link>
      </div>
      <div className={styles.iconContainer}>
        <h1 className={styles.title}>
          {user.displayName ? user.displayName : ''}
        </h1>
        <Link href={user.id ? '/profile' : '/login'}>
          <AccountCircleIcon className={styles.icon} />
        </Link>
      </div>
    </div>
  );
};
