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

type Props = {
  user: User;
  className?: string;
};

export const LeaderboardItem = forwardRef(function (
  props: Props,
  ref: LegacyRef<HTMLDivElement>,
) {
  const { user, className } = props;
  const { languageCode } = useLanguageContext();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
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
          <div>{user.firstName}</div>
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
        <div>{formatRank(user.rank)}</div>
      </div>
    </div>
  );
});

LeaderboardItem.displayName = "LeaderboardItem";
