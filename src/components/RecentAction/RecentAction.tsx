import { cc } from "@/helpers/classConcat.ts";
import styles from "./RecentAction.module.css";
import { Action } from "@/types.ts";
import { ACTION_TYPE, ACTION_TYPE_ICON } from "@/constants.ts";
import { IconGift } from "@/components/IconGift/IconGift.tsx";
import { IconSmallActionType } from "@/components/IconSmallActionType/IconSmallActionType.tsx";
import { ClickableUserName } from "@/components/ClickableUserName/ClickableUserName.tsx";

type Props = {
  action: Action;
};

export function RecentAction(props: Props) {
  const { action } = props;
  const { gift, receiver, sender } = action;
  let description = null;
  switch (action.type) {
    case ACTION_TYPE.buy:
      description = (
        <div>
          -{gift.amount} {gift.asset}
        </div>
      );
      break;
    case ACTION_TYPE.send:
      if (receiver)
        description = (
          <div>
            to <ClickableUserName user={receiver} />
          </div>
        );
      break;
    case ACTION_TYPE.receive:
      description = (
        <div>
          from <ClickableUserName user={sender} />
        </div>
      );
      break;
    default:
      break;
  }
  let actionTypeIcon = null;
  let actionTypeIconClassName = null;
  switch (action.type) {
    case ACTION_TYPE.buy:
      actionTypeIcon = ACTION_TYPE_ICON.market;
      actionTypeIconClassName = styles.market;
      break;
    case ACTION_TYPE.send:
      actionTypeIcon = ACTION_TYPE_ICON.paperPlane;
      actionTypeIconClassName = styles.paperPlane;
      break;
    case ACTION_TYPE.receive:
      actionTypeIcon = ACTION_TYPE_ICON.boxArchive;
      actionTypeIconClassName = styles.boxArchive;
      break;
    default:
      break;
  }
  return (
    <div className={cc(styles.container)}>
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
          <div className={styles.type}>{action.type}</div>
          <div>{gift.title["en"]}</div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
}
