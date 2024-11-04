import giftPurchased from '@/animations/effect-gift-purchased.json';
import balloons from '@/animations/emoji-balloons.json';
import blueStar from '@/animations/gift-blue-star.json'
import deliciousCake from '@/animations/gift-delicious-cake.json'
import redStar from '@/animations/gift-red-star.json'
import greenStar from '@/animations/gift-green-star.json'
import tabGifts from '@/animations/tab-gifts.json'
import tabStore from '@/animations/tab-store.json'
import tabLeaderboard from '@/animations/tab-leaderboard.json'
import tabProfile from '@/animations/tab-profile.json'
import { Player, IPlayerProps } from '@lottiefiles/react-lottie-player';
import {ValuesOf} from "@/types.ts";
import {ICON_ANIMATION} from "@/constants.ts";
import styles from "./IconAnimation.module.css";
import {forwardRef, LegacyRef} from "react";

export const ICON_ANIMATION_PATH = {
  [ICON_ANIMATION.deliciousCake]: deliciousCake,
  [ICON_ANIMATION.giftPurchased]: giftPurchased,
  [ICON_ANIMATION.balloons]: balloons,
  [ICON_ANIMATION.blueStar]: blueStar,
  [ICON_ANIMATION.redStar]: redStar,
  [ICON_ANIMATION.greenStar]: greenStar,
  [ICON_ANIMATION.tabGifts]: tabGifts,
  [ICON_ANIMATION.tabStore]: tabStore,
  [ICON_ANIMATION.tabLeaderboard]: tabLeaderboard,
  [ICON_ANIMATION.tabProfile]: tabProfile
} as const;

type Props = {
  icon: ValuesOf<typeof ICON_ANIMATION>;
  size?: number
} & Omit<IPlayerProps, 'src'>;

export const IconAnimation = forwardRef((props: Props, ref: LegacyRef<Player>) => {
  const {icon, size = 100, ...propsToPass} = props;
  return (
    <div className={styles.image} style={{height: `${size}px`}}>
      <Player
        ref={ref}
        src={ICON_ANIMATION_PATH[icon]}
        className={styles.animation}
        {...propsToPass}
      />
    </div>
  )
})

IconAnimation.displayName = 'IconAnimation';
