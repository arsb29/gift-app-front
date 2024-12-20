import { Page } from "@/components/Page/Page.tsx";
import { Gift } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import { storeQueryFn } from "@/queries/storeQueryFn.ts";
import { GiftStore } from "@/components/GiftStore/GiftStore.tsx";
import styles from "./StorePage.module.css";
import { Header } from "@/components/Header/Header.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { useInfinite } from "@/hooks/useInfinite.ts";

export function StorePage() {
  const {
    isPending,
    list: gifts,
    isError,
    lastElementRef,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfinite<Gift[]>({
    queryKey: [QUERY_KEYS.store],
    queryFn: storeQueryFn,
  });
  const { languageCode } = useLanguageContext();
  if (isPending) return <Loader />;
  if (isError || isFetchNextPageError) return <Error />;
  return (
    <Page back={false} withMenu className={styles.container}>
      <Header
        title={getFormatText({ text: TEXTS.storeHeaderTitle[languageCode] })}
        description={getFormatText({
          text: TEXTS.storeHeaderDescription[languageCode],
        })}
        withIcon
      />
      <div className={styles.list}>
        {gifts.map((gift, index) => (
          <GiftStore
            gift={gift}
            key={gift._id}
            ref={gifts.length === index + 1 ? lastElementRef : null}
          />
        ))}
      </div>
      {isFetchingNextPage && <Loader />}
    </Page>
  );
}
