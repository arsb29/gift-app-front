import {FullTransaction} from "@/types.ts";
import styles from './GiftPurchased.module.css'
import {ICON_ANIMATION} from "@/constants.ts";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";

type Props = {
  transaction: FullTransaction;
}

export function GiftPurchased(props: Props) {
  const {transaction} = props;
  const {gift} = transaction;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{gift.title['en']}</div>
      <div className={styles.image}>
        <IconAnimation
          autoplay
          icon={ICON_ANIMATION[gift.giftId]}
          className={styles.animation}
          keepLastFrame
        />
      </div>
      <div className={styles.send}>Send</div>
    </div>
  )
}