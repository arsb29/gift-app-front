import styles from "./MenuElement.module.css";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {ICON_ANIMATION} from "@/constants.ts";
import {ValuesOf} from "@/types.ts";
import {useCallback, useRef} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import {cc} from "@/helpers/classConcat.ts";
import {ROUTES_PATHS} from "@/navigation/routes.tsx";

type Props = {
  icon: ValuesOf<typeof ICON_ANIMATION>;
  label: string;
  isActive?: boolean;
  route: string;
}

export function MenuElement(props: Props) {
  const {icon, label, route} = props;
  const isActive = Boolean(useMatch(route));
  const navigate = useNavigate();
  const player = useRef();
  const handleClick = useCallback(() => {
    navigate(ROUTES_PATHS.gifts);
    player?.current?.play();
  }, [navigate]);
  return (
    <div className={cc(styles.element, isActive && styles.active)} onClick={handleClick}>
      <IconAnimation
        icon={icon}
        ref={player}
        className={styles.icon}
        playOnHover
        keepLastFrame
      />
      <div className={styles.title}>{label}</div>
    </div>
  )
}