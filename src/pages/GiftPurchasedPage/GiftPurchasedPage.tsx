import { Page } from "@/components/Page/Page.tsx";
import styles from "./GiftPurchasedPage.module.css";
import { cc } from "@/helpers/classConcat.ts";
import { useQuery } from "@tanstack/react-query";
import { FullTransaction } from "@/types.ts";
import { ICON_ANIMATION, QUERY_KEYS } from "@/constants.ts";
import { checkTransactionQueryFn } from "@/queries/checkTransactionQueryFn.ts";
import { useNavigate, useParams } from "react-router-dom";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import {
  mountMainButton,
  setMainButtonParams,
  unmountMainButton,
  onMainButtonClick,
  mountSecondaryButton,
  unmountSecondaryButton,
  setSecondaryButtonParams,
  onSecondaryButtonClick,
  switchInlineQuery,
  offMainButtonClick,
  offSecondaryButtonClick,
  hapticFeedback,
} from "@telegram-apps/sdk-react";
import { useCallback, useEffect } from "react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";
import { IconGift } from "@/components/IconGift/IconGift.tsx";
import { useNotificationsContext } from "@/contexts/notifications/NotificationsContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";

export function GiftPurchasedPage() {
  const { id } = useParams();
  const { onAddNotification } = useNotificationsContext();
  const { languageCode } = useLanguageContext();
  const {
    isPending,
    isError,
    data: transaction,
  } = useQuery<FullTransaction>({
    queryKey: [QUERY_KEYS.giftPurchasedPage],
    queryFn: checkTransactionQueryFn(id),
  });
  const navigate = useNavigate();
  const { onShowMenu, onHideMenu } = useMenuContext();
  const handleSendGift = useCallback(() => {
    if (transaction?.gift?.giftId) {
      hapticFeedback.impactOccurred("soft");
      switchInlineQuery(transaction?.gift?.giftId, ["users"]);
    }
  }, [transaction?.gift?.giftId]);
  const handleSecondaryButtonClick = useCallback(() => {
    navigate(ROUTES_PATHS.store);
  }, [navigate]);
  useEffect(() => {
    onHideMenu();
    return () => {
      onShowMenu();
    };
  }, []);
  useEffect(() => {
    if (transaction?._id) {
      onAddNotification({
        description: getFormatText({
          text: TEXTS.giftPurchasedPageNotificationDescription[languageCode],
        }),
        icon: <IconGift giftId={transaction?.gift?.giftId} />,
        title: getFormatText({
          text: TEXTS.giftPurchasedPageNotificationTitle[languageCode],
        }),
        buttonText: getFormatText({
          text: TEXTS.giftPurchasedPageNotificationButtonText[languageCode],
        }),
        onClick: handleSendGift,
      });
    }
  }, [transaction, handleSendGift, languageCode]);
  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      isVisible: true,
      text: getFormatText({
        text: TEXTS.giftPurchasedPageTelegramMainButton[languageCode],
      }) as string,
    });
    mountSecondaryButton();
    setSecondaryButtonParams({
      isVisible: true,
      text: getFormatText({
        text: TEXTS.giftPurchasedPageTelegramSecondaryButton[languageCode],
      }) as string,
    });
    onMainButtonClick(handleSendGift);
    onSecondaryButtonClick(handleSecondaryButtonClick);
    return () => {
      offMainButtonClick(handleSendGift);
      setMainButtonParams({ isVisible: false });
      unmountMainButton();
      offSecondaryButtonClick(handleSecondaryButtonClick);
      setSecondaryButtonParams({ isVisible: false });
      unmountSecondaryButton();
    };
  }, [handleSendGift, handleSecondaryButtonClick, languageCode]);
  if (isPending) return <Loader />;
  if (isError || !transaction) return <Error />;
  return (
    <Page className={cc(styles.container)}>
      <div className={styles.image}>
        <IconAnimation
          autoplay
          icon={ICON_ANIMATION[transaction.gift.giftId]}
          className={styles.animation}
        />
        <IconAnimation
          autoplay
          icon={ICON_ANIMATION.giftPurchased}
          className={styles.giftPurchased}
        />
      </div>
      <div className={styles.title}>
        {getFormatText({ text: TEXTS.giftPurchasedPageTitle[languageCode] })}
      </div>
      <div className={styles.description}>
        {getFormatText({
          text: TEXTS.giftPurchasedPageDescription[languageCode],
          params: {
            gift: transaction.gift.title[languageCode],
            amount: transaction.gift.amount,
            asset: transaction.gift.asset,
          },
        })}
      </div>
    </Page>
  );
}
