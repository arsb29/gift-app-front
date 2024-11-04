import styles from './ModalGiftContent.module.css';
import {Gift, User} from "@/types.ts";
import {Table} from "@/components/Table/Table.tsx";
import {TableRow} from "@/components/Table/TableRow.tsx";
import {IconAsset} from "@/components/IconAsset/IconAsset.tsx";
import {formatTime} from "@/helpers/formatTime.ts";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {ICON_ANIMATION} from "@/constants.ts";

type Props = {
  sender: User,
  gift: Gift,
  time: number,
  serialNumberOfGift: number
}

export function ModalGiftContent(props: Props) {
  const {gift, time, serialNumberOfGift} = props;
  return (
    <div className={styles.container}>
      <IconAnimation icon={ICON_ANIMATION[gift.giftId]} />
      <div className={styles.title}>Send Gift</div>
      <Table>
        <TableRow label="Gift">
          <div>{gift.title.en}</div>
        </TableRow>
        <TableRow label="Date">
          <div>{formatTime(time)}</div>
        </TableRow>
        <TableRow label="Price">
          <div className={styles.price}>
            <IconAsset asset={gift.asset} withColor/>
            <div className={styles.amount}>{gift.amount} {gift.asset}</div>
          </div>
        </TableRow>
        <TableRow label="Availability">
          <div>{serialNumberOfGift} of {gift.totalNumberOf}</div>
        </TableRow>
      </Table>
    </div>
  )
}