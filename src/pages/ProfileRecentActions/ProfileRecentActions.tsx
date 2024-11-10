import { FC, useEffect, useMemo } from "react";
import { Page } from "@/components/Page/Page.tsx";
import { Action } from "@/types.ts";
import { userRecentActionsQueryFn } from "@/queries/userRecentActionsQueryFn.ts";
import { useParams } from "react-router-dom";
import { useInfinite } from "@/hooks/useInfinite.ts";
import { Header } from "@/components/Header/Header.tsx";
import { Empty } from "@/components/Empty/Empty.tsx";
import styles from "./ProfileRecentActions.module.css";
import { RecentAction } from "@/components/RecentAction/RecentAction.tsx";
import { formatDate } from "@/helpers/formatDate.ts";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";

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
  const { id } = useParams();
  const { onShowMenu, onHideMenu } = useMenuContext();
  const {
    isPending,
    list: actions,
    isError,
    lastElementRef,
    isFetchingNextPage,
  } = useInfinite<Action[]>({
    queryKey: [`profileRecentActions-${id}`],
    queryFn: userRecentActionsQueryFn(id),
  });
  const { languageCode } = useLanguageContext();
  const groupedActionsByDate = useMemo(
    () => groupActionsByDate(actions),
    [actions],
  );
  useEffect(() => {
    onHideMenu();
    return () => {
      onShowMenu();
    };
  }, []);
  if (isPending) return <Loader />;
  if (isError) return <Error />;
  const isEmpty = actions.length === 0;
  if (isEmpty)
    return (
      <Page className={styles.container}>
        <Empty
          title={getFormatText({
            text: TEXTS.profileRecentActionsHeader[languageCode],
          })}
          description={getFormatText({
            text: TEXTS.profileRecentActionsDescription[languageCode],
          })}
        />
      </Page>
    );
  const groupsCount = Object.entries(groupedActionsByDate).length;
  return (
    <Page className={styles.container}>
      <Header
        title={getFormatText({
          text: TEXTS.profileRecentActionsPageTitle[languageCode],
        })}
        description={getFormatText({
          text: TEXTS.profileRecentActionsPageDescription[languageCode],
        })}
      />
      {Object.entries(groupedActionsByDate).map(
        ([date, groupActions], groupIndex) => (
          <div className={styles.list} key={`group-${date}`}>
            <div key={date} className={styles.date}>
              {formatDate({ date, language: languageCode })}
            </div>
            {groupActions.map((actionFromGroup, actionIndex) => (
              <RecentAction
                action={actionFromGroup}
                key={actionFromGroup._id}
                ref={
                  groupsCount === groupIndex + 1 &&
                  groupActions.length === actionIndex + 1
                    ? lastElementRef
                    : null
                }
              />
            ))}
          </div>
        ),
      )}
      {isFetchingNextPage && <Loader />}
    </Page>
  );
};
