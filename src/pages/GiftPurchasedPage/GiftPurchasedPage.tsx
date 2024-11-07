import { Page } from "@/components/Page.tsx";
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
} from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";

export function GiftPurchasedPage() {
  const { id } = useParams();
  const {
    isPending,
    isError,
    data: transaction,
  } = useQuery<FullTransaction>({
    queryKey: [QUERY_KEYS.gifts],
    queryFn: checkTransactionQueryFn(id),
  });
  const navigate = useNavigate();
  const { onShowMenu, onHideMenu } = useMenuContext();
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
      text: "Send Gift",
    });
    mountSecondaryButton();
    setSecondaryButtonParams({
      isVisible: true,
      text: "Open Store",
    });
    onMainButtonClick(() => navigate(ROUTES_PATHS.mygifts));
    onSecondaryButtonClick(() => navigate(ROUTES_PATHS.gifts));
    return () => {
      setMainButtonParams({ isVisible: false });
      unmountMainButton();
      setSecondaryButtonParams({ isVisible: false });
      unmountSecondaryButton();
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
      <div className={styles.title}>Gift Purchased</div>
      <div className={styles.description}>
        The {transaction.gift.title.en} gift was purchased for{" "}
        {transaction.gift.amount} {transaction.gift.asset}.
      </div>
    </Page>
  );
}
