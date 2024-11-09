import { cc } from "@/helpers/classConcat.ts";
import balloons from "@/assets/balloons.png";
import styles from "./Empty.module.css";
import { ReactNode } from "react";

type Props = {
  withBackground?: boolean;
  withMargin?: boolean;
  title?: ReactNode;
  description: ReactNode;
  onClickText?: ReactNode;
  onClick?: () => void;
};

export function Empty(props: Props) {
  const {
    description,
    title,
    withBackground = false,
    withMargin = false,
    onClick,
    onClickText,
  } = props;
  return (
    <div
      className={cc(
        styles.container,
        withBackground && styles.background,
        withMargin && styles.margin,
      )}
    >
      <div>
        <img src={balloons} alt="balloons" />
      </div>
      <div className={styles.info}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.description}>{description}</div>
      </div>
      {onClickText && onClick && (
        <div className={styles.button} onClick={onClick}>
          {onClickText}
        </div>
      )}
    </div>
  );
}
