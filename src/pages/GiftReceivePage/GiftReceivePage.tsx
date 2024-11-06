import {useEffect} from "react";
import {Page} from "@/components/Page.tsx";
import styles from "./GiftReceivePage.module.css";
import {cc} from "@/helpers/classConcat.ts";
import {useQuery} from "@tanstack/react-query";
import {FullTransaction} from "@/types.ts";
import {ICON_ANIMATION} from "@/constants.ts";
import {useNavigate, useParams} from "react-router-dom";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {mountMainButton, setMainButtonParams, unmountMainButton, onMainButtonClick} from "@telegram-apps/sdk-react";
import {ROUTES_PATHS} from "@/navigation/routes.tsx";
import {receiveGiftTransactionQueryFn} from "@/queries/receiveGiftTransactionQueryFn.ts";

export function GiftReceivePage()  {
  const {transactionId} = useParams();
  const {isPending, isError, data: transaction} = useQuery<FullTransaction>({
    queryKey: [`giftReceive-${transactionId}`],
    queryFn: receiveGiftTransactionQueryFn(transactionId),
  });
  const navigate = useNavigate();
  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      text: 'Open Profile'
    })
    onMainButtonClick(() => navigate(ROUTES_PATHS.profile));
    return () => {
      unmountMainButton();
    }
  }, []);
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError || !transaction) return <div>Ошибка</div> // todo сделать спец экран для этого
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
      <div className={styles.title}>Gift Received</div>
      <div className={styles.description}>
        You have received the gift {transaction.gift.title.en}.
      </div>
    </Page>
  )
}
