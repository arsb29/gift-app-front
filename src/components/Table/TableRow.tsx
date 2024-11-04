import {ReactNode} from "react";
import styles from './TableRow.module.css';

type Props = {
  label: string;
  children: ReactNode;
}

export function TableRow(props: Props) {
  const {children, label} = props;
  return (
    <>
      <div className={styles.label}>{label}</div>
      {children}
    </>
  )
}