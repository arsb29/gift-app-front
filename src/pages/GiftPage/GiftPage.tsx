import {FC, useEffect} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import {Gift} from "@/types.ts";
import {toMilliseconds} from "@/helpers/toMilliseconds.ts";
import {useParams} from "react-router-dom";
import {ICON_ANIMATION, QUERY_KEYS} from "@/constants.ts";
import {createTransactionQueryFn} from "@/queries/createTransactionQueryFn.ts";
import {giftsQueryFn} from "@/queries/giftsQueryFn.ts";
import {Page} from "@/components/Page.tsx";
import styles from "./GiftPage.module.css";
import {formatNumber} from "@/helpers/formatNumber.ts";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {cc} from "@/helpers/classConcat.ts";
import {IconAsset} from "@/components/IconAsset/IconAsset.tsx";
import {mainButton, on, openTelegramLink} from "@telegram-apps/sdk-react";

const DEFAULT_MAIN_BUTTON_PARAMS = {
  hasShineEffect: true,
  isEnabled: true,
  isVisible: true,
  text: 'Buy a Gift'
};

export const GiftPage: FC = () => {
  const {id} = useParams();


  useEffect(() => {
    mainButton.mount();
    mainButton.setParams(DEFAULT_MAIN_BUTTON_PARAMS);
    return () => {
      mainButton.unmount();
    }
  }, []);

  const mutation = useMutation({
    mutationFn: async () => {
      if (id) {
        mainButton.setParams({...DEFAULT_MAIN_BUTTON_PARAMS, isLoaderVisible: true});
        try {
          const transaction = await createTransactionQueryFn(id);
          openTelegramLink(transaction.miniAppPayUrl)
        } finally {
          mainButton.setParams({...DEFAULT_MAIN_BUTTON_PARAMS, isLoaderVisible: false});
        }
      }
      return Promise.resolve();
    }
  });

  useEffect(() => {
    const removeListener = on('main_button_pressed', () => mutation.mutate())
    return () => {
      removeListener();
    }
  }, []);


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
