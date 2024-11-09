import { User } from "@/types.ts";
import Time from "@/assets/time.svg?react";
import styles from "./Profile.module.css";
import { ProfileInfo } from "@/components/ProfileInfo/ProfileInfo.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { ProfileReceiveGifts } from "@/components/ProfileReceiveGifts/ProfileReceiveGifts.tsx";
import { ProfileSettings } from "@/components/ProfileSettings/ProfileSettings.tsx";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { hapticFeedback } from "@telegram-apps/sdk-react";

type Props = {
  user: User;
  isOwnProfile?: boolean;
};

export function Profile(props: Props) {
  const { user, isOwnProfile = false } = props;
  const { languageCode } = useLanguageContext();
  const navigate = useNavigate();
  const handleClickRecentActions = useCallback(() => {
    hapticFeedback.impactOccurred("soft");
    navigate(generatePath(ROUTES_PATHS.profileRecentActions, { id: user._id }));
  }, [navigate]);
  return (
    <div className={styles.container}>
      {isOwnProfile && <ProfileSettings />}
      <ProfileInfo user={user} />
      <div
        className={styles.recentActionsLink}
        onClick={handleClickRecentActions}
      >
        <Time />
        <div>
          {getFormatText({ text: TEXTS.profileRecentActions[languageCode] })}
        </div>
      </div>
      <ProfileReceiveGifts userId={user._id} isOwnProfile={isOwnProfile} />
    </div>
  );
}
