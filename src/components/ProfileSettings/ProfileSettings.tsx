import styles from "./ProfileSettings.module.css";
import { Toggle } from "@/components/Toggle/Toggle.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { ToggleValue } from "@/types.ts";
import { LANGUAGE_CODE } from "@/constants.ts";

const SETTINGS_LANGUAGE_VALUES: ToggleValue[] = [
  { value: LANGUAGE_CODE.en, title: "EN" },
  { value: LANGUAGE_CODE.ru, title: "RU" },
];

export function ProfileSettings() {
  const { onChange, languageCode } = useLanguageContext();
  return (
    <div className={styles.container}>
      <Toggle
        onChange={onChange}
        value={languageCode}
        values={SETTINGS_LANGUAGE_VALUES}
      />
      <Toggle
        onChange={onChange}
        value={languageCode}
        values={SETTINGS_LANGUAGE_VALUES}
      />
    </div>
  );
}
