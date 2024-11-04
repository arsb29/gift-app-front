import {User} from "@/types.ts";
import styles from './LeaderboardItem.module.css';
import {formatRank} from "@/helpers/formatRank.ts";
import IconGift from '@/assets/gift.svg?react';
import {forwardRef, LegacyRef} from "react";

type Props = {
  user: User;
}

export const LeaderboardItem = forwardRef(function (props: Props, ref: LegacyRef<HTMLDivElement>) {
  const {user} = props;
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.photo}></div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div>{user.firstName}</div>
          <div className={styles.gifts}>
            <IconGift className={styles.icon} />
            <div className={styles.giftsReceived}>{user.giftsReceived} gifts</div>
          </div>
        </div>
        <div>{formatRank(user.rank)}</div>
      </div>
    </div>
  )
})

LeaderboardItem.displayName = 'LeaderboardItem';