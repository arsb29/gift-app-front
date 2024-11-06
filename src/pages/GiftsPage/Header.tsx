import IconGift from "@/assets/gift.svg?react";
import styles from "./Header.module.css";

type Props = {
  title: string;
  description: string;
  withIcon?: boolean;
};

export function Header(props: Props) {
  const { title, withIcon = false, description } = props;
  return (
    <div className={styles.container}>
      <div className={styles.iconWithText}>
        {withIcon && <IconGift />}
        <div className={styles.bold}>{title}</div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
