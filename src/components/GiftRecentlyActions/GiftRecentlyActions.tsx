import {FC} from 'react';
import styles from "./GiftRecentlyActions.module.css";
import {useInfinite} from "@/hooks/useInfinite.ts";
import {giftActionsQueryFn} from "@/queries/giftActionsQueryFn.ts";
import {Action} from "@/types.ts";
import {GiftRecentlyAction} from "@/components/GiftRecentlyAction/GiftRecentlyAction.tsx";
import {useParams} from "react-router-dom";

export const GiftRecentlyActions: FC = () => {
  const {id = ''} = useParams();
  const {isPending, list, isError, lastElementRef} = useInfinite<Action[]>({
    queryKey: [`GiftRecentlyActions-${id}`],
    queryFn: giftActionsQueryFn(id)
  })
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <div className={styles.list}>
      {list.map((action, index) => {
        if (list.length === index + 1) return <GiftRecentlyAction key={action._id} action={action} ref={lastElementRef} />;
        return <GiftRecentlyAction key={action._id} action={action} />
      })}
    </div>
  )
}
