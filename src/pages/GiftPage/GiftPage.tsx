import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift, Transaction } from "@/types.ts";
import { toMilliseconds } from "@/helpers/toMilliseconds.ts";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import {
  CRYPTO_PAY_INVOICE_STATUS,
  ICON_ANIMATION,
  QUERY_KEYS,
  TELEGRAM_UI_ELEMENT_BACKGROUND_COLOR,
} from "@/constants.ts";
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
import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { useThemeContext } from "@/contexts/theme/ThemeContext.tsx";

export const GiftPage: FC = () => {
  const { giftId } = useParams();
  const navigate = useNavigate();
  const { onHideMenu, onShowMenu } = useMenuContext();
  const { languageCode } = useLanguageContext();
  const { theme } = useThemeContext();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    let eventSource = null;
    if (transaction) {
      eventSource = new EventSource(
        `${import.meta.env.VITE_ENDPOINT}/cryptoPay/check?invoiceId=${transaction.invoiceId}`,
      );
      eventSource.onmessage = (event) => {
        if (event.data === CRYPTO_PAY_INVOICE_STATUS.paid) {
          navigate(
            generatePath(ROUTES_PATHS.giftPaid, { id: transaction._id }),
          );
        }
      };
    }
    return () => {
      if (eventSource) eventSource.close();
    };
  }, [transaction]);

  const handleMainButtonClick = useCallback(() => {
    if (giftId) {
      fetch(`${import.meta.env.VITE_ENDPOINT}/transaction/createInvoice`, {
        method: "POST",
        headers: {
          authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: giftId }),
      })
        .then((res) => {
          if (!res.ok) return Promise.reject();
          return res;
        })
        .then((res) => res.json())
        .then((res) => {
          setTransaction(res);
          return res.miniAppPayUrl;
        })
        .then(openTelegramLink);
    }
  }, [giftId]);

  const handleBack = useCallback(() => {
    navigate(ROUTES_PATHS.store);
  }, [navigate]);

  const {
    isPending,
    isError,
    data: gift,
  } = useQuery<Gift>({
    queryKey: [`${QUERY_KEYS.store}-${giftId}`],
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
      backgroundColor: TELEGRAM_UI_ELEMENT_BACKGROUND_COLOR[theme],
    });
    onMainButtonClick(handleMainButtonClick);
    return () => {
      offMainButtonClick(handleMainButtonClick);
      setMainButtonParams({ isVisible: false });
      unmountMainButton();
    };
  }, [languageCode, gift, handleMainButtonClick, theme]);

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
