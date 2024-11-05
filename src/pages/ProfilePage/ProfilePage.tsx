import {FC} from 'react';
import {Page} from "@/components/Page.tsx";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/types.ts";
import {toMilliseconds} from "@/helpers/toMilliseconds.ts";
import {userQueryFn} from "@/queries/userQueryFn.ts";
import {Profile} from "@/components/Profile/Profile.tsx";
import styles from "./ProfilePage.module.css";

export const ProfilePage: FC = () => {
  const {isPending, isError, data: user} = useQuery<User>({
    queryKey: ['user'],
    queryFn: userQueryFn,
    staleTime: toMilliseconds({minutes: 1})
  });

  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <Page withMenu className={styles.container}>
      <Profile user={user} />
    </Page>
  )
}
