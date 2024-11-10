import { FC } from "react";
import { Page } from "@/components/Page/Page.tsx";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types.ts";
import { toMilliseconds } from "@/helpers/toMilliseconds.ts";
import { userQueryFn } from "@/queries/userQueryFn.ts";
import { Profile } from "@/components/Profile/Profile.tsx";
import styles from "./ProfilePage.module.css";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { QUERY_KEYS } from "@/constants.ts";

export const ProfilePage: FC = () => {
  const {
    isPending,
    isError,
    data: user,
  } = useQuery<User>({
    queryKey: [QUERY_KEYS.profile],
    queryFn: userQueryFn,
    staleTime: toMilliseconds({ minutes: 1 }),
  });

  if (isPending) return <Loader />;
  if (isError) return <Error />;
  return (
    <Page withMenu className={styles.container} back={false}>
      <Profile user={user} isOwnProfile />
    </Page>
  );
};
