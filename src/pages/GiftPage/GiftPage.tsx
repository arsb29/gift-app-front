import { FC, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/types.ts";
import { toMilliseconds } from "@/helpers/toMilliseconds.ts";
import { useNavigate, useParams } from "react-router-dom";
import { ICON_ANIMATION, QUERY_KEYS } from "@/constants.ts";
import { createTransactionQueryFn } from "@/queries/createTransactionQueryFn.ts";
import { Page } from "@/components/Page/Page.tsx";
import styles from "./GiftPage.module.css";
import { formatNumber } from "@/helpers/formatNumber.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { cc } from "@/helpers/classConcat.ts";
import { IconAsset } from "@/components/IconAsset/IconAsset.tsx";
import {
  setMainButtonParams,
  onMainButtonClick,
  mountMainButton,
  unmountMainButton,
  offMainButtonClick,
  openTelegramLink,
} from "@telegram-apps/sdk-react";
import { GiftRecentlyActions } from "@/components/GiftRecentlyActions/GiftRecentlyActions.tsx";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { storeIdQueryFn } from "@/queries/storeIdQueryFn.ts";

const onOpen = () =>
  openTelegramLink("/CryptoTestnetBot/app?startapp=invoice-IVoDg3RN4cN");

export const GiftPage: FC = () => {
  const { giftId } = useParams();
  const navigate = useNavigate();
  const { onHideMenu, onShowMenu } = useMenuContext();
  const { languageCode } = useLanguageContext();
  useQuery({
    queryKey: [QUERY_KEYS.createTransactionQueryFn],
    queryFn: createTransactionQueryFn(giftId),
    enabled: false,
  });
  const handleBack = useCallback(() => {
    navigate(ROUTES_PATHS.store);
  }, [navigate]);

  const {
    isPending,
    isError,
    data: gift,
  } = useQuery<Gift>({
    queryKey: [`${QUERY_KEYS.gifts}-${giftId}`],
    queryFn: storeIdQueryFn(giftId),
    staleTime: toMilliseconds({ minutes: 1 }),
  });

  useEffect(() => {
    onHideMenu();
    return () => {
      onShowMenu();
    };
  }, [onHideMenu, onShowMenu]);

  useEffect(() => {
    const isSoldOut = gift
      ? gift.numberOfPurchased >= gift.totalNumberOf
      : false;
    mountMainButton();
    setMainButtonParams({
      hasShineEffect: true,
      isVisible: Boolean(gift) && !isSoldOut,
      text: getFormatText({
        text: TEXTS.giftPageTelegramMainButton[languageCode],
      }) as string,
    });
    onMainButtonClick(onOpen);
    return () => {
      offMainButtonClick(onOpen);
      setMainButtonParams({ isVisible: false });
      unmountMainButton();
    };
  }, [languageCode, gift]);

  if (isPending) return <Loader />;
  if (isError || !gift) return <Error />;
  return (
    <Page className={cc(styles.container)} onBack={handleBack}>
      <div className={cc(styles.image, `background-${gift.giftId}`)}>
        <IconAnimation
          size={260}
          loop
          autoplay
          icon={ICON_ANIMATION[gift.giftId]}
          keepLastFrame
        />
      </div>
      <div className={styles.info}>
        <div className={styles.titleWithCount}>
          <div className={styles.title}>{gift.title[languageCode]}</div>
          <div className={styles.count}>
            {getFormatText({
              text: TEXTS.currentOfTotal[languageCode],
              params: {
                current: formatNumber(gift.numberOfPurchased),
                total: formatNumber(gift.totalNumberOf),
              },
            })}
          </div>
        </div>
        <div className={styles.description}>
          {getFormatText({ text: TEXTS.giftPageDescription[languageCode] })}
        </div>
        <div className={styles.buy}>
          <IconAsset asset={gift.asset} withColor />
          <div className={styles.amount}>
            {gift.amount} {gift.asset}
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.recentlyActions}>
        {getFormatText({ text: TEXTS.giftPageRecentlyActions[languageCode] })}
      </div>
      <GiftRecentlyActions />
    </Page>
  );
};
