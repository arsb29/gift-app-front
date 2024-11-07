import { useCallback, useEffect } from "react";
import { Page } from "@/components/Page.tsx";
import styles from "./GiftReceivePage.module.css";
import { cc } from "@/helpers/classConcat.ts";
import { useQuery } from "@tanstack/react-query";
import { FullTransaction } from "@/types.ts";
import { ICON_ANIMATION } from "@/constants.ts";
import { useNavigate, useParams } from "react-router-dom";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import {
  mountMainButton,
  setMainButtonParams,
  unmountMainButton,
  onMainButtonClick,
} from "@telegram-apps/sdk-react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { receiveGiftTransactionQueryFn } from "@/queries/receiveGiftTransactionQueryFn.ts";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";
import { useNotificationsContext } from "@/contexts/notifications/NotificationsContext.tsx";
import { IconGift } from "@/components/IconGift/IconGift.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";

export function GiftReceivePage() {
  const { transactionId } = useParams();
  const { onAddNotification } = useNotificationsContext();
  const { languageCode } = useLanguageContext();
  const {
    isPending,
    isError,
    data: transaction,
  } = useQuery<FullTransaction>({
    queryKey: [`giftReceive-${transactionId}`],
    queryFn: receiveGiftTransactionQueryFn(transactionId),
  });
  const navigate = useNavigate();
  const { onShowMenu, onHideMenu } = useMenuContext();
  const handleNotificationClick = useCallback(() => {
    navigate(ROUTES_PATHS.profile);
  }, [navigate]);
  useEffect(() => {
    if (transaction?._id) {
      onAddNotification({
        description: getFormatText({
          text: TEXTS.giftReceivedPageNotificationDescription[languageCode],
          params: {
            giftTitle: transaction.gift.title[languageCode],
            sender: transaction.sender,
          },
        }),
        icon: <IconGift giftId={transaction.gift.giftId} />,
        title: getFormatText({
          text: TEXTS.giftReceivedPageNotificationTitle[languageCode],
        }),
        buttonText: getFormatText({
          text: TEXTS.giftReceivedPageNotificationButtonText[languageCode],
        }),
        onClick: handleNotificationClick,
      });
    }
  }, [transaction?._id]);
  useEffect(() => {
    onHideMenu();
    return () => {
      onShowMenu();
    };
  }, []);
  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      isVisible: true,
      text: getFormatText({
        text: TEXTS.giftReceivedPageTelegramMainButton[languageCode],
      }) as string,
    });
    onMainButtonClick(() => navigate(ROUTES_PATHS.profile));
    return () => {
      setMainButtonParams({ isVisible: false });
      unmountMainButton();
    };
  }, []);
  if (isPending) return <div>Загрузка</div>; // todo сделать спец экран для этого
  if (isError || !transaction) return <div>Ошибка</div>; // todo сделать спец экран для этого
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
        {getFormatText({ text: TEXTS.giftReceivedPageTitle[languageCode] })}
      </div>
      <div className={styles.description}>
        {getFormatText({
          text: TEXTS.giftReceivedPageDescription[languageCode],
          params: { giftTitle: transaction.gift.title[languageCode] },
        })}
      </div>
    </Page>
  );
}
