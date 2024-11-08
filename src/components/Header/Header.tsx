import IconGift from "@/assets/gift.svg?react";
import styles from "./Header.module.css";
import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description: ReactNode;
  withIcon?: boolean;
};

export function Header(props: Props) {
  const { title, withIcon = false, description } = props;
  return (
    <div className={styles.container}>
      <div className={styles.iconWithText}>
        {withIcon && <IconGift />}
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
