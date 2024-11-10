import Close from "@/assets/close.svg?react";
import styles from "./IconClose.module.css";
import { cc } from "@/helpers/classConcat.ts";

type Props = {
  className?: string;
  onClick?: () => void;
};

export function IconClose(props: Props) {
  const { className, onClick } = props;
  return (
    <div className={cc(styles.root, className)} onClick={onClick}>
      <Close onClick={onClick} />
    </div>
  );
}
