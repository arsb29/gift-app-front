import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { LanguageCode } from "@/types.ts";
import { LANGUAGE_CODE, LOCAL_STORAGE_LANGUAGE_KEY } from "@/constants.ts";
import { localStorage } from "@/helpers/localStorage.ts";

type LanguageContextType = {
  languageCode: LanguageCode;
  onChange: (language: LanguageCode) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  languageCode: LANGUAGE_CODE.en,
  onChange: () => {},
});

type Props = {
  children: ReactNode;
};

const DEFAULT_VALUE =
  LANGUAGE_CODE[
    localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) as LanguageCode
  ] || LANGUAGE_CODE.en;

export function LanguageContextProvider(props: Props) {
  const { children } = props;
  const [languageCode, setLanguageCode] = useState<LanguageCode>(DEFAULT_VALUE);
  const handleChange = useCallback((v: LanguageCode) => {
    setLanguageCode(v);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, v);
  }, []);
  const contextValue: LanguageContextType = useMemo(
    () => ({
      languageCode: languageCode,
      onChange: handleChange,
    }),
    [handleChange, languageCode],
  );
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}
