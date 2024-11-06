import { ChangeEvent, useCallback, useRef, useState } from "react";
import SearchIcon from "@/assets/search.svg?react";
import { cc } from "@/helpers/classConcat.ts";
import styles from "./Input.module.css";

type Props = {
  className?: string;
};

export function Input(props: Props) {
  const { className } = props;
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const handleClick = useCallback(() => {
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
          Search
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
