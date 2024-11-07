import { ChangeEvent, useCallback } from "react";
import { cc } from "@/helpers/classConcat.ts";
import styles from "./Toggle.module.css";
import { ToggleValue } from "@/types.ts";

type Props = {
  onChange: (value: any) => void;
  value: string;
  values: ToggleValue[];
};

export function Toggle(props: Props) {
  const { onChange, value, values } = props;
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(!event.target.checked ? values[0].value : values[1].value);
    },
    [onChange, values],
  );
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        name="toggle"
        className={styles.mobileToggle}
        id="toggle"
        checked={values[1].value === value}
        onChange={handleChange}
      />
      <label htmlFor="toggle">
        <div className={cc(styles.value0, styles.value)}>{values[0].title}</div>
        <div className={cc(styles.value1, styles.value)}>{values[1].title}</div>
      </label>
    </div>
  );
}
