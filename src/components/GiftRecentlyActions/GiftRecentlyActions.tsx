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
  const { id = "" } = useParams();
  const { languageCode } = useLanguageContext();
  const { isPending, list, isError, lastElementRef } = useInfinite<Action[]>({
    queryKey: [`GiftRecentlyActions-${id}`],
    queryFn: giftActionsQueryFn(id),
  });
  if (isPending) return <Loader />;
  if (isError) return <Error />;
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
    <div className={styles.list}>
      {list.map((action, index) => {
        if (list.length === index + 1)
          return (
            <GiftRecentlyAction
              key={action._id}
              action={action}
              ref={lastElementRef}
            />
          );
        return <GiftRecentlyAction key={action._id} action={action} />;
      })}
    </div>
  );
};
