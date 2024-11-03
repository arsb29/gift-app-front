import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import {Menu} from "@/components/Menu/Menu.tsx";

type Props = PropsWithChildren<{
  className?: string
  withMenu?: boolean
  back?: boolean
}>;

export function Page(props: Props) {
  const {children, back = true, withMenu = false, className} = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  return (
    <div className={className}>
      {children}
      {withMenu && <Menu />}
    </div>
  );
}