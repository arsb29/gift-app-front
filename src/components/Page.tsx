import { useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { Menu } from "@/components/Menu/Menu.tsx";

type Props = PropsWithChildren<{
  className?: string;
  withMenu?: boolean;
  back?: boolean;
  onBack?: () => void;
}>;

export function Page(props: Props) {
  const { children, back = true, withMenu = false, className, onBack } = props;
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (back) {
      backButton.show();
      backButton.onClick(onBack ? onBack : handleBack);
    }
    return () => {
      backButton.hide();
    };
  }, [back, onBack]);

  return (
    <div className={className}>
      {children}
      {withMenu && <Menu />}
    </div>
  );
}
