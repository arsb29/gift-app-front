import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.chat__loader}>
      <div className={styles.spinner}></div>
    </div>
  );
}
