import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Theme } from "@/types.ts";
import {
  LOCAL_STORAGE_THEME_KEY,
  TELEGRAM_UI_ELEMENT_BACKGROUND_COLOR,
  THEME,
} from "@/constants.ts";
import { localStorage } from "@/helpers/localStorage.ts";
import {
  setMiniAppBackgroundColor,
  setMiniAppHeaderColor,
} from "@telegram-apps/sdk-react";

type ThemeContextType = {
  theme: Theme;
  onChange: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: THEME.light,
  onChange: () => {},
});

type Props = {
  children: ReactNode;
};

const DEFAULT_VALUE =
  THEME[localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme] || THEME.light;

export function ThemeContextProvider(props: Props) {
  const { children } = props;
  const [theme, setTheme] = useState<Theme>(DEFAULT_VALUE);
  const handleSetAttribute = useCallback((theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setMiniAppBackgroundColor(TELEGRAM_UI_ELEMENT_BACKGROUND_COLOR[theme]);
    setMiniAppHeaderColor(TELEGRAM_UI_ELEMENT_BACKGROUND_COLOR[theme]);
  }, []);
  useEffect(() => {
    handleSetAttribute(DEFAULT_VALUE);
  }, [DEFAULT_VALUE]);
  const handleChange = useCallback((t: Theme) => {
    handleSetAttribute(t);
    setTheme(t);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, t);
  }, []);
  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme: theme,
      onChange: handleChange,
    }),
    [handleChange, theme],
  );
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
