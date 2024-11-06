import PaperPlane from "@/assets/paperPlane.svg?react";
import Market from "@/assets/market.svg?react";
import BoxArchive from "@/assets/boxArchive.svg?react";
import { ACTION_TYPE_ICON } from "@/constants.ts";
import styles from "./IconSmallActionType.module.css";
import { cc } from "@/helpers/classConcat.ts";
import { ActionTypeIcon } from "@/types.ts";

type Props = {
  actionTypeIcon: ActionTypeIcon;
  className?: string;
};

export function IconSmallActionType(props: Props) {
  const { className, actionTypeIcon } = props;
  let IconComponent = null;
  switch (actionTypeIcon) {
    case ACTION_TYPE_ICON.market:
      IconComponent = Market;
      break;
    case ACTION_TYPE_ICON.boxArchive:
      IconComponent = BoxArchive;
      break;
    case ACTION_TYPE_ICON.paperPlane:
    default:
      IconComponent = PaperPlane;
      break;
  }
  return (
    <div className={cc(styles.container, className)}>
      <IconComponent />
    </div>
  );
}
