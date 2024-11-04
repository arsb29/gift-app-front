import styles from './Modal.module.css';
import {ReactNode} from "react";

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal(props: Props) {
  const {open, children, onClose} = props;
  return (
    <dialog open={open} className={styles.dialog} onClose={onClose} cli>
      <div className={styles.close} onClick={onClose}>Закрыть</div>
      {children}
    </dialog>
  )
}