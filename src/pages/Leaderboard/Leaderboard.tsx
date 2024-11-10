import { FC, useEffect, useMemo, useState } from "react";
import { User } from "@/types.ts";
import { QUERY_KEYS } from "@/constants.ts";
import { Page } from "@/components/Page/Page.tsx";
import styles from "./Leaderboard.module.css";
import { cc } from "@/helpers/classConcat.ts";
import { leaderboardQueryFn } from "@/queries/leaderboardQueryFn.ts";
import { LeaderboardItem } from "@/components/LeaderboardItem/LeaderboardItem.tsx";
import { Input } from "@/components/Input/Input.tsx";
import { useInfinite } from "@/hooks/useInfinite.ts";
import { filterUsers } from "@/helpers/filterUsers.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { useQuery } from "@tanstack/react-query";
import { userQueryFn } from "@/queries/userQueryFn.ts";
import { toMilliseconds } from "@/helpers/toMilliseconds.ts";

const SEARCH_NAME = "searchFilter";

export const Leaderboard: FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get(SEARCH_NAME) || "",
  );
  const {
    isPending,
    list: users,
    isError,
    lastElementRef,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfinite<User[]>({
    queryKey: [QUERY_KEYS.leaderboard],
    queryFn: leaderboardQueryFn,
  });

  const { data: userProfile } = useQuery<User>({
    queryKey: [QUERY_KEYS.profile],
    queryFn: userQueryFn,
    staleTime: toMilliseconds({ minutes: 1 }),
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams(search);
    newSearchParams.set(SEARCH_NAME, searchValue);
    navigate({ search: newSearchParams.toString() });
  }, [searchValue, search]);

  const filteredUsers = useMemo(
    () => users.filter((user) => filterUsers(user, searchValue)),
    [users, searchValue],
  );

  if (isPending) return <Loader />;
  if (isError || isFetchNextPageError) return <Error />;
  return (
    <>
      <Page withMenu className={cc(styles.container)} back={false}>
        <Input
          className={styles.input}
          value={searchValue}
          onChange={setSearchValue}
        />
        <div className={styles.separator} />
        <div className={styles.leaderboard}>
          {filteredUsers.map((user, index) => (
            <LeaderboardItem
              key={user._id}
              user={user}
              ref={filteredUsers.length === index + 1 ? lastElementRef : null}
            />
          ))}
        </div>
        {isFetchingNextPage && <Loader />}
      </Page>
      {userProfile && (
        <LeaderboardItem user={userProfile} className={styles.fixedItem} />
      )}
    </>
  );
};
