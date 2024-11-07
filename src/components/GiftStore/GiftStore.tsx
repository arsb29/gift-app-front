import { Gift } from "@/types.ts";
import styles from "./GiftStore.module.css";
import { CRYPTO_ASSET, ICON_ANIMATION } from "@/constants.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { IconAsset } from "@/components/IconAsset/IconAsset.tsx";
import { formatNumber } from "@/helpers/formatNumber.ts";
import { cc } from "@/helpers/classConcat.ts";
import { useCallback } from "react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useNavigate } from "react-router-dom";

type Props = {
  gift: Gift;
};

export function GiftStore(props: Props) {
  const navigate = useNavigate();
  const { gift } = props;
  const handleClick = useCallback(() => {
    navigate(`${ROUTES_PATHS.gifts}/${gift._id}`);
  }, [navigate, gift._id]);
  return (
    <div
      className={cc(styles.container, `background-${gift.giftId}`)}
      onClick={handleClick}
    >
      <div className={styles.count}>
        {formatNumber(gift.numberOfPurchased + gift.numberOfBooked)} of{" "}
        {formatNumber(gift.totalNumberOf)}
      </div>
      <IconAnimation
        size={128}
        autoplay
        icon={ICON_ANIMATION[gift.giftId]}
        keepLastFrame
      />
      <div className={styles.title}>{gift.title["en"]}</div>
      <div className={styles.buyButton}>
        <IconAsset asset={CRYPTO_ASSET[gift.asset]} size={24} />
        <div className={styles.amount}>
          {gift.amount} {gift.asset}
        </div>
      </div>
    </div>
  );
}
