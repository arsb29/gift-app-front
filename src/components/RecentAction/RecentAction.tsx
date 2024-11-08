import { cc } from "@/helpers/classConcat.ts";
import styles from "./RecentAction.module.css";
import { Action } from "@/types.ts";
import { ACTION_TYPE, ACTION_TYPE_ICON } from "@/constants.ts";
import { IconGift } from "@/components/IconGift/IconGift.tsx";
import { IconSmallActionType } from "@/components/IconSmallActionType/IconSmallActionType.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { ForwardedRef, forwardRef } from "react";

type Props = {
  action: Action;
};

export const RecentAction = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { action } = props;
    const { languageCode } = useLanguageContext();
    const { gift, receiver, sender } = action;
    let description = null;
    switch (action.type) {
      case ACTION_TYPE.buy:
        description = getFormatText({
          text: TEXTS.profileRecentActionBuyDescription[languageCode],
          params: { amount: gift.amount, asset: gift.asset },
        });
        break;
      case ACTION_TYPE.send:
        if (receiver)
          description = getFormatText({
            text: TEXTS.profileRecentActionSendDescription[languageCode],
            params: { receiver },
          });
        break;
      case ACTION_TYPE.receive:
        description = getFormatText({
          text: TEXTS.profileRecentActionReceiveDescription[languageCode],
          params: { sender },
        });
        break;
      default:
        break;
    }
    let actionTypeIcon = null;
    let actionTypeText = null;
    let actionTypeIconClassName = null;
    switch (action.type) {
      case ACTION_TYPE.buy:
        actionTypeText = getFormatText({
          text: TEXTS.profileRecentActionsPageTypeBuy[languageCode],
        });
        actionTypeIcon = ACTION_TYPE_ICON.market;
        actionTypeIconClassName = styles.market;
        break;
      case ACTION_TYPE.send:
        actionTypeText = getFormatText({
          text: TEXTS.profileRecentActionsPageTypeSend[languageCode],
        });
        actionTypeIcon = ACTION_TYPE_ICON.paperPlane;
        actionTypeIconClassName = styles.paperPlane;
        break;
      case ACTION_TYPE.receive:
        actionTypeText = getFormatText({
          text: TEXTS.profileRecentActionsPageTypeReceive[languageCode],
        });
        actionTypeIcon = ACTION_TYPE_ICON.boxArchive;
        actionTypeIconClassName = styles.boxArchive;
        break;
      default:
        break;
    }
    return (
      <div className={cc(styles.container)} ref={ref}>
        <div className={styles.image}>
          <IconGift giftId={gift.giftId} />
          {actionTypeIcon && actionTypeIconClassName && (
            <IconSmallActionType
              actionTypeIcon={actionTypeIcon}
              className={cc(styles.actionTypeIcon, actionTypeIconClassName)}
            />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.type}>{actionTypeText}</div>
            <div>{gift.title[languageCode]}</div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    );
  },
);

RecentAction.displayName = "RecentAction";
