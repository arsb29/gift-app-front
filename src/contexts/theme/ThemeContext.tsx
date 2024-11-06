import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Theme } from "@/types.ts";
import { THEME } from "@/constants.ts";

type ThemeContextType = {
  value: Theme;
  onChange: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  value: THEME.light,
  onChange: () => {},
});

type Props = {
  children: ReactNode;
};

export function ThemeContextProvider(props: Props) {
  const { children } = props;
  const [value, setValue] = useState<Theme>(THEME.light);
  const handleChange = useCallback((t: Theme) => {
    setValue(t);
  }, []);
  const contextValue: ThemeContextType = useMemo(
    () => ({
      value,
      onChange: handleChange,
    }),
    [handleChange, value],
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
