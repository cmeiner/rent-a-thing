import { Spinner } from '@chakra-ui/react';
import styles from './skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.content}>
        <Spinner thickness="4px" color="white" speed="0.9s" size="xl" />
      </div>
      <div className={styles.cardDescription}></div>
    </div>
  );
};
