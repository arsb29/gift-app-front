import { FC } from "react";
import { User } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import { Page } from "@/components/Page.tsx";
import styles from "./Leaderboard.module.css";
import { cc } from "@/helpers/classConcat.ts";
import { leaderboardQueryFn } from "@/queries/leaderboardQueryFn.ts";
import { LeaderboardItem } from "@/components/LeaderboardItem/LeaderboardItem.tsx";
import { Input } from "@/components/Input/Input.tsx";
import { useInfinite } from "@/hooks/useInfinite.ts";

export const Leaderboard: FC = () => {
  const {
    isPending,
    list: users,
    isError,
    lastElementRef,
  } = useInfinite<User[]>({
    queryKey: [QUERY_KEYS.leaderboard],
    queryFn: leaderboardQueryFn,
  });

  if (isPending) return <div>Загрузка</div>; // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div>; // todo сделать спец экран для этого
  return (
    <Page withMenu className={cc(styles.container)}>
      <Input className={styles.input} />
      <div className={styles.separator} />
      <div className={styles.leaderboard}>
        {users.map((user, index) => {
          if (users.length === index + 1) {
            return (
              <LeaderboardItem
                key={user._id}
                user={user}
                ref={lastElementRef}
              />
            );
          }
          return <LeaderboardItem key={user._id} user={user} />;
        })}
      </div>
    </Page>
  );
};
