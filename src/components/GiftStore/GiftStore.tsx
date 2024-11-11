import { Gift } from "@/types.ts";
import styles from "./GiftStore.module.css";
import { CRYPTO_ASSET, ICON_ANIMATION } from "@/constants.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { IconAsset } from "@/components/IconAsset/IconAsset.tsx";
import { formatNumber } from "@/helpers/formatNumber.ts";
import { cc } from "@/helpers/classConcat.ts";
import { ForwardedRef, forwardRef, useCallback } from "react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { hapticFeedback } from "@telegram-apps/sdk-react";

type Props = {
  gift: Gift;
};

export const GiftStore = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const navigate = useNavigate();
    const { languageCode } = useLanguageContext();
    const { gift } = props;
    const isSoldOut = gift.numberOfPurchased >= gift.totalNumberOf;
    const handleClick = useCallback(() => {
      if (isSoldOut) {
        hapticFeedback.notificationOccurred("error");
      } else {
        hapticFeedback.impactOccurred("soft");
        navigate(generatePath(ROUTES_PATHS.gift, { giftId: gift._id }));
      }
    }, [navigate, gift._id, isSoldOut]);
    return (
      <div
        className={cc(styles.container, `background-${gift.giftId}`)}
        onClick={handleClick}
        ref={ref}
      >
        <div className={styles.count}>
          {getFormatText({
            text: TEXTS.currentOfTotal[languageCode],
            params: {
              current: formatNumber(gift.numberOfPurchased),
              total: formatNumber(gift.totalNumberOf),
            },
          })}
        </div>
        <IconAnimation
          size={128}
          autoplay
          icon={ICON_ANIMATION[gift.giftId]}
          keepLastFrame
        />
        <div className={styles.title}>{gift.title[languageCode]}</div>
        {isSoldOut && (
          <div className={cc(styles.soldOut, styles.buyButton)}>
            {getFormatText({ text: TEXTS.giftStoreSoldOut[languageCode] })}
          </div>
        )}
        {!isSoldOut && (
          <div className={styles.buyButton}>
            <IconAsset asset={CRYPTO_ASSET[gift.asset]} size={24} />
            <div className={styles.amount}>
              {gift.amount} {gift.asset}
            </div>
          </div>
        )}
      </div>
    );
  },
);

GiftStore.displayName = "GiftStore";
