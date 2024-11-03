import IconGift from '@/assets/gift.svg?react';
import styles from './Header.module.css';

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.iconWithText}>
        <IconGift />
        <div className={styles.bold}>Buy and Send Gifts</div>
      </div>
      <div className={styles.description}>Unique gifts for everyone by Crypto Pay.</div>
    </div>
  );
}