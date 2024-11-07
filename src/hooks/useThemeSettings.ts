import { LOCAL_STORAGE_THEME_KEY, THEME } from "@/constants.ts";
import { localStorage } from "@/helpers/localStorage.ts";
import { Theme } from "@/types.ts";
import { useCallback, useMemo, useState } from "react";

const DEFAULT_VALUE =
  THEME[localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme] || THEME.light;

export function useThemeSettings() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_VALUE);
  const handleChange = useCallback((v: Theme) => {
    console.log(LOCAL_STORAGE_THEME_KEY);
    setTheme(v);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, v);
  }, []);
  return useMemo(
    () => ({
      theme,
      onChange: handleChange,
    }),
    [handleChange, theme],
  );
}
