import { User } from "@/types.ts";
import Time from "@/assets/time.svg?react";
import styles from "./Profile.module.css";
import { ProfileInfo } from "@/components/ProfileInfo/ProfileInfo.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { UserReceiveActions } from "@/components/UserReceiveActions/UserReceiveActions.tsx";

type Props = {
  user: User;
};

export function Profile(props: Props) {
  const { user } = props;
  const navigate = useNavigate();
  const handleClickRecentActions = useCallback(() => {
    navigate(generatePath(ROUTES_PATHS.profileRecentActions, { id: user._id }));
  }, [navigate]);
  return (
    <div className={styles.container}>
      <ProfileInfo user={user} />
      <div
        className={styles.recentActionsLink}
        onClick={handleClickRecentActions}
      >
        <Time />
        <div>Recent Actions ›</div>
      </div>
      <UserReceiveActions userId={user._id} />
    </div>
  );
}
