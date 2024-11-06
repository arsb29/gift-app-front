import {createContext, ReactNode, useCallback, useContext, useMemo, useState} from "react";
import {LanguageCode} from "@/types.ts";
import {LANGUAGE_CODE} from "@/constants.ts";

type LanguageContextType = {
  value: LanguageCode;
  onChange: (language: LanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  value: LANGUAGE_CODE.en,
  onChange: () => {}
})

type Props = {
  children: ReactNode;
}

export function LanguageContextProvider(props: Props) {
  const {children} = props;
  const [value, setValue] = useState<LanguageCode>(LANGUAGE_CODE.en);
  const handleChange = useCallback((v: LanguageCode) => {
    setValue(v);
  }, []);
  const contextValue: LanguageContextType = useMemo(() => ({
    value,
    onChange: handleChange,
  }), [handleChange, value]);
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}
