import { useCallback } from "react";
import styles from "./Notification.module.css";
import { useNotificationsContext } from "@/contexts/notifications/NotificationsContext.tsx";
import { NotificationType } from "@/types.ts";

type Props = NotificationType;

export function Notification(props: Props) {
  const { icon, title, description, buttonText, onClick, id } = props;
  const { onRemoveNotification } = useNotificationsContext();
  const handleClick = useCallback(() => {
    onClick();
    onRemoveNotification(id);
  }, [onClick, id, onRemoveNotification]);
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <div className={styles.button} onClick={handleClick}>
          {buttonText}
        </div>
      </div>
    </div>
  );
}
