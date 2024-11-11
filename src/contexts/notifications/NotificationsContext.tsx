import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { NotificationType } from "@/types.ts";

type NotificationsContextType = {
  notifications: NotificationType[];
  onAddNotification: (options: Omit<NotificationType, "id">) => void;
  onRemoveNotification: (id: number) => void;
};

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  onAddNotification: () => {},
  onRemoveNotification: () => {},
});

type Props = {
  children: ReactNode;
};

export function NotificationsContextProvider(props: Props) {
  const { children } = props;
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const handleRemoveNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id),
    );
  }, []);
  const handleAddNotification = useCallback(
    (options: Omit<NotificationType, "id">) => {
      const id = Date.now();
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id, ...options },
      ]);
      setTimeout(() => {
        handleRemoveNotification(id);
      }, 6000);
    },
    [handleRemoveNotification],
  );
  const contextValue = useMemo(
    () => ({
      onAddNotification: handleAddNotification,
      onRemoveNotification: handleRemoveNotification,
      notifications,
    }),
    [handleAddNotification, handleRemoveNotification, notifications],
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsContext() {
  return useContext(NotificationsContext);
}
