import { useNavigate } from "react-router-dom";
import {
  offBackButtonClick,
  hideBackButton,
  showBackButton,
  onBackButtonClick,
} from "@telegram-apps/sdk-react";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { cc } from "@/helpers/classConcat.ts";
import styles from "./Page.module.css";

type Props = PropsWithChildren<{
  className?: string;
  withMenu?: boolean;
  back?: boolean;
  onBack?: () => void;
}>;

export function Page(props: Props) {
  const { children, back = true, className, onBack } = props;
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (back) {
      showBackButton();
      onBackButtonClick(onBack ? onBack : handleBack);
    }
    return () => {
      offBackButtonClick(onBack ? onBack : handleBack);
      hideBackButton();
    };
  }, [back]);

  return <div className={cc(styles.container, className)}>{children}</div>;
}
