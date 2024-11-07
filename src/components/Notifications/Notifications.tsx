import { Notification } from "@/components/Notification/Notification.tsx";
import { useNotificationsContext } from "@/contexts/notifications/NotificationsContext.tsx";
import styles from "./Notifications.module.css";

export function Notifications() {
  const { notifications } = useNotificationsContext();
  return (
    notifications.length > 0 && (
      <div className={styles.notifications}>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    )
  );
}
