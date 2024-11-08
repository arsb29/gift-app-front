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
import { Error } from "@/components/Error/Error.tsx";
import { Empty } from "@/components/Empty/Empty.tsx";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";

export function MyGifts() {
  const {
    isPending,
    isError,
    data: transactions,
  } = useQuery<FullTransaction[]>({
    queryKey: [QUERY_KEYS.myGifts],
    queryFn: checkTransactionQueryFn,
  });
  const navigate = useNavigate();
  const { languageCode } = useLanguageContext();
  const handleOpenStore = useCallback(() => {
    navigate(ROUTES_PATHS.gifts);
  }, [navigate]);
  if (isPending) return <Loader />;
  if (isError) return <Error />;
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
      {transactions.length === 0 && (
        <Empty
          description={getFormatText({
            text: TEXTS.myGiftsEmptyListDescription[languageCode],
          })}
          onClickText={getFormatText({
            text: TEXTS.myGiftsEmptyListButtonText[languageCode],
          })}
          onClick={handleOpenStore}
          withBackground
        />
      )}
      {transactions.length > 0 && (
        <div className={styles.list}>
          {transactions.map((transaction) => (
            <GiftPurchased transaction={transaction} key={transaction._id} />
          ))}
        </div>
      )}
    </Page>
  );
}
