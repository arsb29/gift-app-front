import {User} from "@/types.ts";
import styles from "./Profile.module.css";
import {ProfileInfo} from "@/components/ProfileInfo/ProfileInfo.tsx";

type Props = {
  user: User
}

export function Profile(props: Props) {
  const {user} = props;
  return (
    <div className={styles.container}>
      <ProfileInfo user={user} />
    </div>
  )
}
