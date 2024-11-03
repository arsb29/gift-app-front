import {Page} from "@/components/Page.tsx";
import styles from "./GiftPaidPage.module.css";
import {cc} from "@/helpers/classConcat.ts";
import {useQuery} from "@tanstack/react-query";
import {FullTransaction} from "@/types.ts";
import {ICON_ANIMATION, QUERY_KEYS} from "@/constants.ts";
import {checkTransactionQueryFn} from "@/queries/checkTransactionQueryFn.ts";
import {useParams} from "react-router-dom";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";

export function GiftPaidPage()  {
  const {id} = useParams();
  const {isPending, isError, data: transaction} = useQuery<FullTransaction>({
    queryKey: [QUERY_KEYS.gifts],
    queryFn: checkTransactionQueryFn(id),
  });
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError || !transaction) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <Page className={cc(styles.container)}>
      <div className={styles.image}>
        <IconAnimation autoplay icon={ICON_ANIMATION[transaction.gift.giftId]} />
        <IconAnimation autoplay icon={ICON_ANIMATION.giftPurchased} />
      </div>
    </Page>
  )
}
