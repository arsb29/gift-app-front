import { User } from "@/types.ts";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import styles from "./ProfileInfo.module.css";
import { formatName } from "@/helpers/formatName.ts";
import Premium from "@/assets/premium.svg?react";
import { cc } from "@/helpers/classConcat.ts";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { TEXTS } from "@/texts.ts";

type Props = {
  user: User;
};

export function ProfileInfo(props: Props) {
  const { user } = props;
  const { languageCode } = useLanguageContext();
  return (
    <div className={styles.container}>
      <div className={styles.avatarWithRank}>
        <Avatar user={user} size={100} />
        <div className={cc(styles.rank, user.rank === 1 && styles.gold)}>
          #{user.rank}
        </div>
      </div>
      <div className={styles.nameWithPrem}>
        <div className={styles.name}>{formatName(user)}</div>
        {user.isPremium && <Premium />}
      </div>
      <div className={styles.giftsReceived}>
        {getFormatText({
          text: TEXTS.profileGiftsReceived[languageCode],
          params: { count: user.giftsReceived },
        })}
      </div>
    </div>
  );
}
