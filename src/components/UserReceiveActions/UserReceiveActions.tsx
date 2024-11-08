import { Action } from "@/types.ts";
import { useInfinite } from "@/hooks/useInfinite.ts";
import { Empty } from "@/components/Empty/Empty.tsx";
import { userReceiveActionsQueryFn } from "@/queries/userRecieveActionsQueryFn.ts";
import { GiftInProfile } from "@/components/GiftInProfile/GiftInProfile.tsx";
import styles from "./UserReceiveActions.module.css";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";

type Props = {
  userId: string;
  isOwnProfile?: boolean;
};

export function UserReceiveActions(props: Props) {
  const { userId, isOwnProfile } = props;
  const { languageCode } = useLanguageContext();
  const {
    isPending,
    list: actions,
    isError,
    lastElementRef,
  } = useInfinite<Action[]>({
    queryKey: [`userReceiveActions-${userId}`],
    queryFn: userReceiveActionsQueryFn(userId),
  });
  const navigate = useNavigate();
  const handleOpenStore = useCallback(() => {
    navigate(ROUTES_PATHS.store);
  }, [navigate]);
  if (isPending) return <Loader />;
  if (isError) return <Error />;
  const isEmpty = actions.length === 0;
  if (isEmpty) {
    if (isOwnProfile)
      return (
        <Empty
          description={getFormatText({
            text: TEXTS.profileEmptyGiftsDescriptions[languageCode],
          })}
          onClickText={getFormatText({
            text: TEXTS.profileEmptyGiftsButtonText[languageCode],
          })}
          onClick={handleOpenStore}
          withBackground
        />
      );
    return (
      <Empty
        description={getFormatText({
          text: TEXTS.leaderboardIdEmptyGiftsDescriptions[languageCode],
        })}
        withBackground
      />
    );
  }

  return (
    <div className={styles.container}>
      {actions.map((action, index) => {
        if (actions.length === index + 1)
          return (
            <GiftInProfile
              ref={lastElementRef}
              key={action._id}
              action={action}
            />
          );
        return <GiftInProfile key={action._id} action={action} />;
      })}
    </div>
  );
}
