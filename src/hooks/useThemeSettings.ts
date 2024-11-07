import { LOCAL_STORAGE_THEME_KEY, THEME } from "@/constants.ts";
import { localStorage } from "@/helpers/localStorage.ts";
import { Theme } from "@/types.ts";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useThemeSettings() {
  const defaultValue =
    THEME[localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme] ||
    THEME.light;
  const [theme, setTheme] = useState<Theme>(defaultValue);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", defaultValue);
  }, []);
  const handleChange = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    setTheme(t);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, t);
  }, []);
  return useMemo(
    () => ({
      theme,
      onChange: handleChange,
    }),
    [handleChange, theme],
  );
}
