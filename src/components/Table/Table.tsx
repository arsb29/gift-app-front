import styles from './Table.module.css';
import {ReactNode} from "react";

type Props = {
  children: ReactNode;
}

export function Table(props: Props) {
  const {children} = props;
  return (
    <div className={styles.table}>
      {children}
    </div>
  )
}