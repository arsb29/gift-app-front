import { User } from "@/types.ts";
import styles from "./LeaderboardItem.module.css";
import { formatRank } from "@/helpers/formatRank.ts";
import IconGift from "@/assets/gift.svg?react";
import { forwardRef, LegacyRef, useCallback } from "react";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { cc } from "@/helpers/classConcat.ts";
import { hapticFeedback } from "@telegram-apps/sdk-react";
import { formatName } from "@/helpers/formatName.ts";

type Props = {
  user: User;
  className?: string;
  isMyProfile: boolean;
};

const FIRST_THREE_PLACES = [1, 2, 3];

export const LeaderboardItem = forwardRef(function (
  props: Props,
  ref: LegacyRef<HTMLDivElement>,
) {
  const { user, className, isMyProfile } = props;
  const { languageCode } = useLanguageContext();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    hapticFeedback.impactOccurred("soft");
    navigate(generatePath(ROUTES_PATHS.leaderboardId, { id: user._id }));
  }, [navigate, user._id]);
  return (
    <div
      className={cc(styles.container, className)}
      ref={ref}
      onClick={handleClick}
    >
      <Avatar user={user} size={40} className={styles.photo} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.name}>
            <span>{formatName(user)}</span>
            {isMyProfile && (
              <span className={styles.myProfile}>
                {getFormatText({
                  text: TEXTS.leaderboardItemMyProfile[languageCode],
                })}
              </span>
            )}
          </div>
          <div className={styles.gifts}>
            <IconGift className={styles.icon} />
            <div className={styles.giftsReceived}>
              {getFormatText({
                text: TEXTS.leaderboardPageLeaderboardItemGiftsCount[
                  languageCode
                ],
                params: { count: user.giftsReceived },
              })}
            </div>
          </div>
        </div>
        <div
          className={cc(FIRST_THREE_PLACES.includes(user.rank) && styles.rank)}
        >
          {formatRank(user.rank)}
        </div>
      </div>
    </div>
  );
});

LeaderboardItem.displayName = "LeaderboardItem";
