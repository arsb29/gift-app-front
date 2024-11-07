import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/components/Page.tsx";
import { Gift } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import { giftsQueryFn } from "@/queries/giftsQueryFn.ts";
import { GiftStore } from "@/components/GiftStore/GiftStore.tsx";
import styles from "./GiftsPage.module.css";
import { Header } from "@/components/Header/Header.tsx";

export const GiftsPage: FC = () => {
  const {
    isPending,
    isError,
    data: gifts,
  } = useQuery<Gift[]>({
    queryKey: [QUERY_KEYS.gifts],
    queryFn: giftsQueryFn,
  });
  if (isPending) return <div>Загрузка</div>; // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div>; // todo сделать спец экран для этого
  return (
    <Page back={false} withMenu className={styles.container}>
      <Header
        title="Buy and Send Gifts"
        description="Unique gifts for everyone by Crypto Pay."
      />
      <div className={styles.list}>
        {gifts.map((gift) => (
          <GiftStore gift={gift} key={gift._id} />
        ))}
      </div>
    </Page>
  );
};
