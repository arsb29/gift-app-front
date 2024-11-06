import styles from "./ModalGiftContent.module.css";
import { Gift, User } from "@/types.ts";
import { Table } from "@/components/Table/Table.tsx";
import { TableRow } from "@/components/Table/TableRow.tsx";
import { IconAsset } from "@/components/IconAsset/IconAsset.tsx";
import { formatTime } from "@/helpers/formatTime.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { ICON_ANIMATION } from "@/constants.ts";
import { useEffect } from "react";
import {
  mountMainButton,
  setMainButtonParams,
  unmountMainButton,
  onMainButtonClick,
} from "@telegram-apps/sdk-react";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { formatName } from "@/helpers/formatName.ts";

type Props = {
  sender: User;
  gift: Gift;
  time: number;
  serialNumberOfGift: number;
  onClick: () => void;
};

export function ModalGiftContent(props: Props) {
  const { gift, time, serialNumberOfGift, onClick, sender } = props;
  const { giftId } = gift;
  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      text: "Close",
      isVisible: true,
    });
    onMainButtonClick(onClick);
    return () => {
      setMainButtonParams({
        isVisible: false,
      });
      unmountMainButton();
    };
  }, []);
  return (
    <div className={styles.container}>
      <IconAnimation icon={ICON_ANIMATION[giftId]} />
      <div className={styles.title}>{gift.title.en}</div>
      <Table>
        <TableRow label="From">
          <div className={styles.from}>
            <Avatar user={sender} size={20} />
            <div>{formatName(sender)}</div>
          </div>
        </TableRow>
        <TableRow label="Date">
          <div>{formatTime(time)}</div>
        </TableRow>
        <TableRow label="Price">
          <div className={styles.price}>
            <IconAsset asset={gift.asset} withColor />
            <div className={styles.amount}>
              {gift.amount} {gift.asset}
            </div>
          </div>
        </TableRow>
        <TableRow label="Availability">
          <div>
            {serialNumberOfGift} of {gift.totalNumberOf}
          </div>
        </TableRow>
      </Table>
    </div>
  );
}
