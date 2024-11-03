import {Gift} from "@/types.ts";
import styles from './GiftStore.module.css'
import PatternLight from '@/assets/patternLight.svg?react';
import {CRYPTO_ASSET, ICON_ANIMATION} from "@/constants.ts";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {IconAsset} from "@/components/IconAsset/IconAsset.tsx";
import {formatNumber} from "@/helpers/formatNumber.ts";
import {cc} from "@/helpers/classConcat.ts";

type Props = {
  gift: Gift;
  onClick: () => void;
}

export function GiftStore(props: Props) {
  const {gift, onClick} = props;
  return (
    <div className={cc(styles.container, styles[`background-${gift.giftId}`])} onClick={onClick}>
      <PatternLight className={styles.image} />
      <div className={styles.count}>{formatNumber(gift.numberOfPurchased + gift.numberOfBooked)} of {formatNumber(gift.totalNumberOf)}</div>
      <IconAnimation
        autoplay
        icon={ICON_ANIMATION[gift.giftId]}
        className={styles.animation}
        keepLastFrame
      />
      <div className={styles.title}>{gift.title['en']}</div>
      <div className={styles.buyButton}>
        <IconAsset asset={CRYPTO_ASSET[gift.asset]} size={24} />
        <div className={styles.amount}>{gift.amount} {gift.asset}</div>
      </div>
    </div>
  )
}