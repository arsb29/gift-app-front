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
import { Empty } from "@/components/Empty/Empty.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";

const SEARCH_NAME = "searchFilter";

export const Leaderboard: FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { languageCode } = useLanguageContext();
  const searchParams = new URLSearchParams(search);
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get(SEARCH_NAME) || "",
  );
  const {
    isPending,
    list: users,
    isError,
    lastElementRef,
  } = useInfinite<User[]>({
    queryKey: [QUERY_KEYS.leaderboard],
    queryFn: leaderboardQueryFn,
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
  if (isError)
    return (
      <Empty
        title={getFormatText({ text: TEXTS.errorTitle[languageCode] })}
        description={getFormatText({
          text: TEXTS.errorDescription[languageCode],
        })}
        withBackground
        withMargin
      />
    );
  return (
    <Page withMenu className={cc(styles.container)}>
      <Input
        className={styles.input}
        value={searchValue}
        onChange={setSearchValue}
      />
      <div className={styles.separator} />
      <div className={styles.leaderboard}>
        {filteredUsers.map((user, index) => {
          if (filteredUsers.length === index + 1) {
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
