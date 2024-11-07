import { FC, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/types.ts";
import { toMilliseconds } from "@/helpers/toMilliseconds.ts";
import { useNavigate, useParams } from "react-router-dom";
import { ICON_ANIMATION, QUERY_KEYS } from "@/constants.ts";
import { createTransactionQueryFn } from "@/queries/createTransactionQueryFn.ts";
import { giftsQueryFn } from "@/queries/giftsQueryFn.ts";
import { Page } from "@/components/Page.tsx";
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
} from "@telegram-apps/sdk-react";
import { GiftRecentlyActions } from "@/components/GiftRecentlyActions/GiftRecentlyActions.tsx";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";

export const GiftPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onHideMenu, onShowMenu } = useMenuContext();
  const { languageCode } = useLanguageContext();
  const { refetch } = useQuery({
    queryKey: ["createTransactionQueryFn"],
    queryFn: createTransactionQueryFn(id),
    enabled: false,
  });
  const handleBack = useCallback(() => {
    navigate(ROUTES_PATHS.gifts);
  }, [navigate]);

  useEffect(() => {
    onHideMenu();
    return () => {
      onShowMenu();
    };
  }, [onHideMenu, onShowMenu]);

  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      hasShineEffect: true,
      isVisible: true,
      text: getFormatText({
        text: TEXTS.giftPageTelegramMainButton[languageCode],
      }) as string,
    });
    onMainButtonClick(refetch);
    return () => {
      offMainButtonClick(refetch);
      setMainButtonParams({ isVisible: false });
      unmountMainButton();
    };
  }, [languageCode, id]);

  const {
    isPending,
    isError,
    data: gifts,
  } = useQuery<Gift[]>({
    //todo вынести и убрать дублирование запросов
    queryKey: [QUERY_KEYS.gifts],
    queryFn: giftsQueryFn,
    staleTime: toMilliseconds({ minutes: 1 }),
  });
  const gift = gifts?.find((g) => g._id === id);
  if (isPending) return <div>Загрузка</div>; // todo сделать спец экран для этого
  if (isError || !gift) return <div>Ошибка</div>; // todo сделать спец экран для этого
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
            {formatNumber(gift.numberOfPurchased + gift.numberOfBooked)} of{" "}
            {formatNumber(gift.totalNumberOf)}
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
