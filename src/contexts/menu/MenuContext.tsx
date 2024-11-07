import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type MenuContextType = {
  value: boolean;
  onChange: (v: boolean) => void;
};

export const MenuContext = createContext<MenuContextType>({
  value: true,
  onChange: () => {},
});

type Props = {
  children: ReactNode;
};

export function MenuContextProvider(props: Props) {
  const { children } = props;
  const [value, setValue] = useState<boolean>(true);
  const handleChange = useCallback((v: boolean) => {
    setValue(v);
  }, []);
  const contextValue: MenuContextType = useMemo(
    () => ({
      value,
      onChange: handleChange,
    }),
    [handleChange, value],
  );
  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}

export function useMenuContext() {
  const { value, onChange } = useContext(MenuContext);
  const handleHideMenu = useCallback(() => {
    onChange(false);
  }, [onChange]);
  const handleShowMenu = useCallback(() => {
    onChange(true);
  }, [onChange]);
  const contextValue = useMemo(
    () => ({
      value,
      onHideMenu: handleHideMenu,
      onShowMenu: handleShowMenu,
    }),
    [value, handleHideMenu, handleShowMenu],
  );
  return contextValue;
}
