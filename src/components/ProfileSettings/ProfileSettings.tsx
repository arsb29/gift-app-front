import styles from "./ProfileSettings.module.css";
import IconLight from "@/assets/light.svg?react";
import IconDark from "@/assets/dark.svg?react";

import { Toggle } from "@/components/Toggle/Toggle.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { ToggleValue } from "@/types.ts";
import { LANGUAGE_CODE, THEME } from "@/constants.ts";
import { useThemeSettings } from "@/hooks/useThemeSettings.ts";

const SETTINGS_LANGUAGE_VALUES: ToggleValue[] = [
  { value: LANGUAGE_CODE.en, title: "EN" },
  { value: LANGUAGE_CODE.ru, title: "RU" },
];

const SETTINGS_THEME_VALUES: ToggleValue[] = [
  { title: <IconLight />, value: THEME.light },
  { title: <IconDark />, value: THEME.dark },
];

export function ProfileSettings() {
  const { onChange: onChangeTheme, theme } = useThemeSettings();
  const { onChange, languageCode } = useLanguageContext();
  return (
    <div className={styles.container}>
      <Toggle
        name="theme"
        onChange={onChangeTheme}
        value={theme}
        values={SETTINGS_THEME_VALUES}
      />
      <Toggle
        name="language"
        onChange={onChange}
        value={languageCode}
        values={SETTINGS_LANGUAGE_VALUES}
      />
    </div>
  );
}
