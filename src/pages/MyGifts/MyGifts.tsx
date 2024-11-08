import { useQuery } from "@tanstack/react-query";
import { Page } from "@/components/Page/Page.tsx";
import { FullTransaction } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import styles from "./MyGifts.module.css";
import { Header } from "@/components/Header/Header.tsx";
import { checkTransactionQueryFn } from "@/queries/needToSendGiftsQueryFn.ts";
import { GiftPurchased } from "@/components/GiftPurchased/GiftPurchased.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Empty } from "@/components/Empty/Empty.tsx";

export function MyGifts() {
  const {
    isPending,
    isError,
    data: transactions,
  } = useQuery<FullTransaction[]>({
    queryKey: [QUERY_KEYS.myGifts],
    queryFn: checkTransactionQueryFn,
  });
  const { languageCode } = useLanguageContext();
  if (isPending) return <Loader />;
  if (isError)
    return (
      <Empty
        title={getFormatText({ text: TEXTS.errorTitle[languageCode] })}
        description={getFormatText({
          text: TEXTS.errorDescription[languageCode],
        })}
        withBackground
        withMargin
      />
    );
  return (
    <Page back={false} withMenu className={styles.container} key="page">
      <Header
        title={getFormatText({
          text: TEXTS.giftsPageHeaderTitle[languageCode],
        })}
        description={getFormatText({
          text: TEXTS.giftsPageHeaderDescription[languageCode],
        })}
      />
      <div className={styles.list}>
        {transactions.map((transaction) => (
          <GiftPurchased transaction={transaction} key={transaction._id} />
        ))}
      </div>
    </Page>
  );
}
