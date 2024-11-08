import { FC } from "react";
import styles from "./GiftRecentlyActions.module.css";
import { useInfinite } from "@/hooks/useInfinite.ts";
import { giftActionsQueryFn } from "@/queries/giftActionsQueryFn.ts";
import { Action } from "@/types.ts";
import { GiftRecentlyAction } from "@/components/GiftRecentlyAction/GiftRecentlyAction.tsx";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { Empty } from "@/components/Empty/Empty.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";

export const GiftRecentlyActions: FC = () => {
  const { giftId = "" } = useParams();
  const { languageCode } = useLanguageContext();
  const {
    isPending,
    list,
    isError,
    lastElementRef,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfinite<Action[]>({
    queryKey: [`GiftRecentlyActions-${giftId}`],
    queryFn: giftActionsQueryFn(giftId),
  });
  if (isPending) return <Loader />;
  if (isError || isFetchNextPageError) return <Error />;
  if (list.length === 0)
    return (
      <Empty
        title={getFormatText({
          text: TEXTS.giftPageRecentlyActionsEmptyTitle[languageCode],
        })}
        description={getFormatText({
          text: TEXTS.giftPageRecentlyActionsEmptyDescription[languageCode],
        })}
        withBackground
      />
    );
  return (
    <>
      <div className={styles.list}>
        {list.map((action, index) => (
          <GiftRecentlyAction
            key={action._id}
            action={action}
            ref={list.length === index + 1 ? lastElementRef : null}
          />
        ))}
      </div>
      {isFetchingNextPage && <Loader />}
    </>
  );
};
