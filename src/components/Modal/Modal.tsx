import {ReactNode, useEffect, useRef} from "react";
import {IconClose} from "@/components/IconClose/IconClose.tsx";
import styles from './Modal.module.css';

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal(props: Props) {
  const {open, children, onClose} = props;
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.addEventListener('click', function({currentTarget, target}) {
      const isClickedOnBackDrop = target === currentTarget;
      if (isClickedOnBackDrop) onClose();
    })
  }, [ref.current]);
  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);
  return (
    <dialog ref={ref} className={styles.dialog} onClose={onClose}>
      <IconClose className={styles.close} onClick={onClose} />
      {children}
    </dialog>
  )
}