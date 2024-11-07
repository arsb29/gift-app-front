import { ChangeEvent, useCallback } from "react";
import { cc } from "@/helpers/classConcat.ts";
import styles from "./Toggle.module.css";
import { ToggleValue } from "@/types.ts";

type Props = {
  onChange: (value: any) => void;
  value: string;
  values: ToggleValue[];
  name: string;
};

export function Toggle(props: Props) {
  const { onChange, value, values, name } = props;
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
        name={name}
        className={styles.mobileToggle}
        id={name}
        checked={values[1].value === value}
        onChange={handleChange}
      />
      <label htmlFor={name}>
        <div className={cc(styles.value0, styles.value)}>{values[0].title}</div>
        <div className={cc(styles.value1, styles.value)}>{values[1].title}</div>
      </label>
    </div>
  );
}
