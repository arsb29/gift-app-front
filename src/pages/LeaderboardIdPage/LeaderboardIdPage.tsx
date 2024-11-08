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
import { Empty } from "@/components/Empty/Empty.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";

export const LeaderboardIdPage: FC = () => {
  const { id } = useParams();
  const { languageCode } = useLanguageContext();
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
    <Page withMenu className={styles.container} back={false}>
      <Profile user={user} />
    </Page>
  );
};
