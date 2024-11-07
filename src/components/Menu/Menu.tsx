import { ICON_ANIMATION } from "@/constants.ts";
import { MenuElement } from "@/components/Menu/MenuElement.tsx";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";
import styles from "./Menu.module.css";

export function Menu() {
  const { value } = useMenuContext();
  if (!value) return null;
  return (
    <div className={styles.container}>
      <MenuElement
        route={ROUTES_PATHS.gifts}
        icon={ICON_ANIMATION.tabStore}
        label="Store"
      />
      <MenuElement
        route={ROUTES_PATHS.mygifts}
        icon={ICON_ANIMATION.tabGifts}
        label="Gifts"
      />
      <MenuElement
        route={ROUTES_PATHS.leaderboard}
        icon={ICON_ANIMATION.tabLeaderboard}
        label="Leaderboard"
      />
      <MenuElement
        route={ROUTES_PATHS.profile}
        icon={ICON_ANIMATION.tabProfile}
        label="Profile"
      />
    </div>
  );
}
