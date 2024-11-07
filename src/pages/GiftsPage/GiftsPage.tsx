import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/components/Page.tsx";
import { Gift } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import { giftsQueryFn } from "@/queries/giftsQueryFn.ts";
import { GiftStore } from "@/components/GiftStore/GiftStore.tsx";
import styles from "./GiftsPage.module.css";
import { Header } from "@/components/Header/Header.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";

export const GiftsPage: FC = () => {
  const {
    isPending,
    isError,
    data: gifts,
  } = useQuery<Gift[]>({
    queryKey: [QUERY_KEYS.gifts],
    queryFn: giftsQueryFn,
  });
  const { languageCode } = useLanguageContext();
  if (isPending) return <div>Загрузка</div>; // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div>; // todo сделать спец экран для этого
  return (
    <Page back={false} withMenu className={styles.container}>
      <Header
        title={getFormatText({ text: TEXTS.storeHeaderTitle[languageCode] })}
        description={getFormatText({
          text: TEXTS.storeHeaderDescription[languageCode],
        })}
      />
      <div className={styles.list}>
        {gifts.map((gift) => (
          <GiftStore gift={gift} key={gift._id} />
        ))}
      </div>
    </Page>
  );
};
