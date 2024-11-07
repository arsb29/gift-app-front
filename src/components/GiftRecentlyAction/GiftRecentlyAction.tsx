import { forwardRef, LegacyRef } from "react";
import { Action } from "@/types.ts";
import styles from "./GiftRecentlyAction.module.css";
import { ACTION_TYPE } from "@/constants.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { ClickableUserName } from "@/components/ClickableUserName/ClickableUserName.tsx";

type Props = {
  action: Action;
};

export const GiftRecentlyAction = forwardRef(
  (props: Props, ref: LegacyRef<HTMLDivElement>) => {
    const { action } = props;
    const { type, sender, receiver } = action;
    const title = type === ACTION_TYPE.buy ? "Buy gift" : "Send gift";
    const receiverText = receiver ? (
      <span>
        to <ClickableUserName user={receiver} />
      </span>
    ) : (
      ""
    );
    const description =
      type === ACTION_TYPE.buy ? (
        <span>
          <ClickableUserName user={sender} /> bought a gift
        </span>
      ) : (
        <span>
          <ClickableUserName user={sender} /> sent gift {receiverText}
        </span>
      );
    return (
      <div ref={ref} className={styles.container}>
        <Avatar user={type === ACTION_TYPE.buy ? sender : receiver} size={40} />
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div>{description}</div>
        </div>
      </div>
    );
  },
);

GiftRecentlyAction.displayName = "GiftRecentlyAction";
