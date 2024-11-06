import { cc } from "@/helpers/classConcat.ts";
import styles from "./Empty.module.css";

type Props = {
  withBackground?: boolean;
  title?: string;
  description: string;
  onClickText?: string;
  onClick?: () => void;
};

export function Empty(props: Props) {
  const {
    description,
    title,
    withBackground = false,
    onClick,
    onClickText,
  } = props;
  return (
    <div className={cc(styles.container, withBackground && styles.background)}>
      <div>
        <img src="/src/assets/balloons.png" alt="balloons" />
      </div>
      <div className={styles.info}>
        {title && <div className={styles.title}>{title}</div>}
        <div>{description}</div>
      </div>
      {onClickText && onClick && (
        <div className={styles.button} onClick={onClick}>
          {onClickText}
        </div>
      )}
    </div>
  );
}
