import { User } from "@/types.ts";
import { formatName } from "@/helpers/formatName.ts";
import { useCallback } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import styles from "./ClickableUserName.module.css";

type Props = {
  user: User;
};

export function ClickableUserName(props: Props) {
  const { user } = props;
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(generatePath(ROUTES_PATHS.leaderboardId, { id: user._id }));
  }, [navigate]);
  return (
    <span onClick={handleClick} className={styles.name}>
      {formatName(user)}
    </span>
  );
}
