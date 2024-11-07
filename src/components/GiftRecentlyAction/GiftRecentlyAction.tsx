import { forwardRef, LegacyRef } from "react";
import { Action } from "@/types.ts";
import styles from "./GiftRecentlyAction.module.css";
import { ACTION_TYPE, ACTION_TYPE_ICON } from "@/constants.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { IconSmallActionType } from "@/components/IconSmallActionType/IconSmallActionType.tsx";
import { cc } from "@/helpers/classConcat.ts";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";

type Props = {
  action: Action;
};

export const GiftRecentlyAction = forwardRef(
  (props: Props, ref: LegacyRef<HTMLDivElement>) => {
    const { action } = props;
    const { languageCode } = useLanguageContext();
    const { type, sender, receiver } = action;
    const title =
      type === ACTION_TYPE.buy
        ? getFormatText({
            text: TEXTS.giftPageRecentlyActionTypeBuy[languageCode],
          })
        : getFormatText({
            text: TEXTS.giftPageRecentlyActionTypeSend[languageCode],
          });
    const description =
      type === ACTION_TYPE.buy
        ? getFormatText({
            text: TEXTS.giftPageRecentlyActionTypeBuyDescription[languageCode],
            params: { sender },
          })
        : getFormatText({
            text: TEXTS.giftPageRecentlyActionTypeSendDescription[languageCode],
            params: { sender, receiver },
          });
    return (
      <div ref={ref} className={styles.container}>
        <div className={styles.image}>
          <Avatar
            user={type === ACTION_TYPE.buy ? sender : receiver}
            size={40}
          />
          <IconSmallActionType
            actionTypeIcon={
              type === ACTION_TYPE.buy
                ? ACTION_TYPE_ICON.market
                : ACTION_TYPE_ICON.paperPlane
            }
            className={cc(
              styles.actionTypeIcon,
              type === ACTION_TYPE.buy ? styles.market : styles.paperPlane,
            )}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div>{description}</div>
        </div>
      </div>
    );
  },
);

GiftRecentlyAction.displayName = "GiftRecentlyAction";
