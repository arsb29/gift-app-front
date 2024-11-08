import { Page } from "@/components/Page/Page.tsx";
import { FullTransaction } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import styles from "./GiftsPurchasedPage.module.css";
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
import { useInfinite } from "@/hooks/useInfinite.ts";

export function GiftsPurchasedPage() {
  const {
    isPending,
    list: transactions,
    isError,
    lastElementRef,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfinite<FullTransaction[]>({
    queryKey: [QUERY_KEYS.myGifts],
    queryFn: checkTransactionQueryFn,
  });
  const navigate = useNavigate();
  const { languageCode } = useLanguageContext();
  const handleOpenStore = useCallback(() => {
    navigate(ROUTES_PATHS.store);
  }, [navigate]);
  if (isPending) return <Loader />;
  if (isError || isFetchNextPageError) return <Error />;
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
          {transactions.map((transaction, index) => (
            <GiftPurchased
              transaction={transaction}
              key={transaction._id}
              ref={transactions.length === index + 1 ? lastElementRef : null}
            />
          ))}
        </div>
      )}
      {isFetchingNextPage && <Loader />}
    </Page>
  );
}
