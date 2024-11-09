import styles from "./MenuElement.module.css";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { ICON_ANIMATION } from "@/constants.ts";
import { ValuesOf } from "@/types.ts";
import { ReactNode, useCallback, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { cc } from "@/helpers/classConcat.ts";
import { hapticFeedback } from "@telegram-apps/sdk-react";

type Props = {
  icon: ValuesOf<typeof ICON_ANIMATION>;
  label: ReactNode;
  isActive?: boolean;
  route: string;
};

export function MenuElement(props: Props) {
  const { icon, label, route } = props;
  const isActive = Boolean(useMatch(route));
  const navigate = useNavigate();
  const player = useRef<any>(null);
  const handleClick = useCallback(() => {
    hapticFeedback.impactOccurred("soft");
    player?.current?.setSeeker(0);
    player?.current?.play();
    navigate(route);
  }, [navigate, player?.current]);
  return (
    <div
      className={cc(styles.element, isActive && styles.active)}
      onClick={handleClick}
    >
      <IconAnimation
        icon={icon}
        size={26}
        ref={player}
        className={styles.icon}
        keepLastFrame
      />
      <div className={styles.title}>{label}</div>
    </div>
  );
}
