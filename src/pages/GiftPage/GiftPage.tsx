import {FC} from 'react';
import {useQuery} from "@tanstack/react-query";
import {Gift} from "@/types.ts";
import {toMilliseconds} from "@/helpers/toMilliseconds.ts";
import {useParams} from "react-router-dom";
import {ICON_ANIMATION, QUERY_KEYS} from "@/constants.ts";
import {giftsQueryFn} from "@/queries/giftsQueryFn.ts";
import {Page} from "@/components/Page.tsx";
import styles from "./GiftPage.module.css";
import {formatNumber} from "@/helpers/formatNumber.ts";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {cc} from "@/helpers/classConcat.ts";
import {IconAsset} from "@/components/IconAsset/IconAsset.tsx";

export const GiftPage: FC = () => {
  const {id} = useParams();
  const {isPending, isError, data: gifts} = useQuery<Gift[]>({ //todo вынести и убрать дублирование запросов
    queryKey: [QUERY_KEYS.gifts],
    queryFn: giftsQueryFn,
    staleTime: toMilliseconds({minutes: 1})
  });
  const gift = gifts?.find(g => g._id === id);
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError || !gift) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <Page className={cc(styles.container)}>
      <div className={cc(styles.image, `background-${gift.giftId}`)}>
        <IconAnimation
          loop
          autoplay
          icon={ICON_ANIMATION[gift.giftId]}
          className={styles.animation}
          keepLastFrame
        />
      </div>
      <div className={styles.info}>
        <div className={styles.titleWithCount}>
          <div className={styles.title}>{gift.title['en']}</div>
          <div
            className={styles.count}>{formatNumber(gift.numberOfPurchased + gift.numberOfBooked)} of {formatNumber(gift.totalNumberOf)}</div>
        </div>
        <div className={styles.description}>Purchase this gift for the opportunity to give it to another user.</div>
        <div className={styles.buy}>
          <IconAsset asset={gift.asset} withColor/>
          <div className={styles.amount}>{gift.amount} {gift.asset}</div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.recentlyActions}>Recently Actions</div>
    </Page>

  )
};
