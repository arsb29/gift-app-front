import {FC, useMemo} from 'react';
import {Page} from "@/components/Page.tsx";
import {Action} from "@/types.ts";
import {userRecentActionsQueryFn} from "@/queries/userRecentActionsQueryFn.ts";
import {useParams} from "react-router-dom";
import {useInfinite} from "@/hooks/useInfinite.ts";
import {Header} from "@/pages/GiftsPage/Header.tsx";
import {Empty} from "@/components/Empty/Empty.tsx";
import styles from "./ProfileRecentActions.module.css";
import {RecentAction} from "@/components/RecentAction/RecentAction.tsx";
import {formatDate} from "@/helpers/formatDate.ts";


const groupActionsByDate = (actions: Action[]) => {
  return actions.reduce((grouped: Record<string, Action[]>, action) => {
    const date = new Date(action.time).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(action);
    return grouped;
  }, {});
};


export const ProfileRecentActions: FC = () => {
  const {id} = useParams();
  const {isPending, list: actions, isError, lastElementRef} = useInfinite<Action[]>({
    queryKey: [`ProfileRecentActions-${id}`],
    queryFn: userRecentActionsQueryFn(id)
  });

  const groupedActionsByDate = useMemo(() => groupActionsByDate(actions), [actions]);
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  const isEmpty = actions.length === 0;
  if (isEmpty) return (
    <Page className={styles.container}>
      <Empty
        title="History is Empty"
        description="Give and receive gifts so there's something here."
      />
    </Page>
  )

  return (
    <Page className={styles.container}>
      <Header title="Recent Actions" description="Here is your action history." />
      {Object.entries(groupedActionsByDate).map(([date, groupActions]) => (
        <div className={styles.list} key={`group-${date}`} ref={lastElementRef}>
          <div key={date} className={styles.date}>{formatDate({date})}</div>
          {groupActions.map(actionFromGroup => <RecentAction action={actionFromGroup} key={actionFromGroup._id} />)}
        </div>
      ))}
    </Page>
  )
}
