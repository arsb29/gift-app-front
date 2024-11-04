import {FC, useCallback, useMemo, useRef} from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import {LeaderboardResponse, User} from "@/types.ts";
import {QUERY_KEYS} from "@/constants.ts";
import {Page} from "@/components/Page.tsx";
import styles from "./Leaderboard.module.css";
import {cc} from "@/helpers/classConcat.ts";
import {leaderboardQueryFn} from "@/queries/leaderboardQueryFn.ts";
import {LeaderboardItem} from "@/components/LeaderboardItem/LeaderboardItem.tsx";

export const Leaderboard: FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError
  } = useInfiniteQuery<any, any, LeaderboardResponse>({
    queryKey: [QUERY_KEYS.leaderboard],
    queryFn: leaderboardQueryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.currentPage + 1 : null
  })

  const users: User[] = useMemo(() => {
    if (!data?.pages) return [];
    return data?.pages?.reduce((result, group) => ([...result, ...group.users]), [])
  }, [data]);
  const observer = useRef();
  const lastApplicationElementRef = useCallback(node => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <Page withMenu className={cc(styles.container)}>
      <div className={styles.leaderboard}>
        {users.map((user, index) => {
          if (users.length === index + 1) {
            return <LeaderboardItem key={user._id} user={user} ref={lastApplicationElementRef} />;
          }
          return <LeaderboardItem key={user._id} user={user} />;
        })}
      </div>
    </Page>
  )
}
