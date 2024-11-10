import { ICON_ANIMATION } from "@/constants.ts";
import { MenuElement } from "@/components/Menu/MenuElement.tsx";
import { ROUTES_PATHS } from "@/navigation/routes.tsx";
import { useMenuContext } from "@/contexts/menu/MenuContext.tsx";
import styles from "./Menu.module.css";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { cc } from "@/helpers/classConcat.ts";

const LEADERBOARD_ADDITIONAL_MATCHING_ROUTES = [ROUTES_PATHS.leaderboardId];

export function Menu() {
  const { value } = useMenuContext();
  const { languageCode } = useLanguageContext();
  return (
    <div className={cc(styles.container, !value && styles.hide)}>
      <MenuElement
        route={ROUTES_PATHS.store}
        icon={ICON_ANIMATION.tabStore}
        label={getFormatText({ text: TEXTS.menuStore[languageCode] })}
      />
      <MenuElement
        route={ROUTES_PATHS.giftsPurchased}
        icon={ICON_ANIMATION.tabGifts}
        label={getFormatText({ text: TEXTS.menuGifts[languageCode] })}
      />
      <MenuElement
        route={ROUTES_PATHS.leaderboard}
        icon={ICON_ANIMATION.tabLeaderboard}
        label={getFormatText({ text: TEXTS.menuLeaderboard[languageCode] })}
        additionalMatchingRoutes={LEADERBOARD_ADDITIONAL_MATCHING_ROUTES}
      />
      <MenuElement
        route={ROUTES_PATHS.profile}
        icon={ICON_ANIMATION.tabProfile}
        label={getFormatText({ text: TEXTS.menuProfile[languageCode] })}
      />
    </div>
  );
}
