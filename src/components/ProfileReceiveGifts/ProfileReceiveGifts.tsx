import { FullTransaction } from "@/types.ts";
import { useInfinite } from "@/hooks/useInfinite.ts";
import { Empty } from "@/components/Empty/Empty.tsx";
import { profileReceiveGiftsQueryFn } from "@/queries/profileReceiveGiftsQueryFn.ts";
import { GiftInProfile } from "@/components/GiftInProfile/GiftInProfile.tsx";
import styles from "./ProfileReceiveGifts.module.css";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Error } from "@/components/Error/Error.tsx";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { hapticFeedback } from "@telegram-apps/sdk-react";

type Props = {
  userId: string;
  isOwnProfile?: boolean;
};

export function ProfileReceiveGifts(props: Props) {
  const { userId, isOwnProfile } = props;
  const { languageCode } = useLanguageContext();
  const {
    isPending,
    list: transactions,
    isError,
    lastElementRef,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfinite<FullTransaction[]>({
    queryKey: [`profileReceiveGifts-${userId}`],
    queryFn: profileReceiveGiftsQueryFn(userId),
  });
  const navigate = useNavigate();
  const handleOpenStore = useCallback(() => {
    hapticFeedback.impactOccurred("soft");
    navigate(ROUTES_PATHS.store);
  }, [navigate]);
  if (isPending) return <Loader />;
  if (isError || isFetchNextPageError) return <Error />;
  const isEmpty = transactions.length === 0;
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
    <>
      <div className={styles.container}>
        {transactions.map((transaction, index) => (
          <GiftInProfile
            ref={transactions.length === index + 1 ? lastElementRef : null}
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </div>
      {isFetchingNextPage && <Loader />}
    </>
  );
}
