import { FC } from "react";
import { Page } from "@/components/Page/Page.tsx";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types.ts";
import { toMilliseconds } from "@/helpers/toMilliseconds.ts";
import { Profile } from "@/components/Profile/Profile.tsx";
import styles from "./LeaderboardIdPage.module.css";
import { userIdQueryFn } from "@/queries/userIdQueryFn.ts";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";

export const LeaderboardIdPage: FC = () => {
  const { id } = useParams();
  const {
    isPending,
    isError,
    data: user,
  } = useQuery<User>({
    queryKey: [`user-${id}`],
    queryFn: userIdQueryFn(id),
    staleTime: toMilliseconds({ minutes: 1 }),
  });

  if (isPending) return <Loader />;
  if (isError) return <Error />;
  return (
    <Page withMenu className={styles.container}>
      <Profile user={user} />
    </Page>
  );
};
