import { ChangeEvent, useCallback, useRef, useState } from "react";
import SearchIcon from "@/assets/search.svg?react";
import { cc } from "@/helpers/classConcat.ts";
import styles from "./Input.module.css";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { hapticFeedback } from "@telegram-apps/sdk-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Input(props: Props) {
  const { className, onChange, value } = props;
  const { languageCode } = useLanguageContext();
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const handleClick = useCallback(() => {
    hapticFeedback.impactOccurred("soft");
    if (ref.current) ref.current.focus();
  }, [ref.current]);
  return (
    <div className={cc(styles.container, className)} onClick={handleClick}>
      <div
        className={cc(
          styles.labelWithIcon,
          focused && styles.focused,
          value && styles.withValue,
        )}
      >
        <SearchIcon />
        <div className={cc(styles.label, value && styles.withValue)}>
          {getFormatText({
            text: TEXTS.leaderboardPageSearchPlaceholder[languageCode],
          })}
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.input}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
      />
    </div>
  );
}
