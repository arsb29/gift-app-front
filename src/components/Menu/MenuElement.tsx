import styles from "./MenuElement.module.css";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {ICON_ANIMATION} from "@/constants.ts";
import {ValuesOf} from "@/types.ts";
import {useRef} from "react";

type Props = {
  icon: ValuesOf<typeof ICON_ANIMATION>;
  label: string;
}

export function MenuElement(props: Props) {
  const {icon, label} = props;
  const player = useRef();
  const handleClick = () => {
    if (player) player.current.play();
  }
  return (
    <div className={styles.element} onClick={handleClick}>
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