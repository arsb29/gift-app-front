import {ICON_ANIMATION} from "@/constants.ts";
import styles from "./Menu.module.css";
import {MenuElement} from "@/components/Menu/MenuElement.tsx";

export function Menu() {
  return (
    <div className={styles.container}>
      <MenuElement icon={ICON_ANIMATION.tabStore} label="Store" />
      <MenuElement icon={ICON_ANIMATION.tabGifts} label="Gifts" />
      <MenuElement icon={ICON_ANIMATION.tabLeaderboard} label="Leaderboard" />
      <MenuElement icon={ICON_ANIMATION.tabProfile} label="Profile" />
    </div>
  );
}
