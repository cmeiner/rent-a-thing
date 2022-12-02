import Image from 'next/image';
import styles from './Footer.module.scss';
import logo from '../../../assets/Logo.svg';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" className={styles.image} />
      </div>
      <div className={styles.links}>
        <a>Om oss</a>
        <a>Kundtjänst</a>
        <a>Vanliga frågor</a>
      </div>
    </div>
  );
};
