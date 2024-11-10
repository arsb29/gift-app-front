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
  offMainButtonClick,
} from "@telegram-apps/sdk-react";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import { ClickableUserName } from "@/components/ClickableUserName/ClickableUserName.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";

type Props = {
  sender: User;
  gift: Gift;
  time: number;
  serialNumberOfGift: number;
  onClick: () => void;
};

export function ModalGiftContent(props: Props) {
  const { gift, time, serialNumberOfGift, onClick, sender } = props;
  const { languageCode } = useLanguageContext();
  const { giftId } = gift;
  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      text: "Close",
      isVisible: true,
    });
    onMainButtonClick(onClick);
    return () => {
      offMainButtonClick(onClick);
      setMainButtonParams({
        isVisible: false,
      });
      unmountMainButton();
    };
  }, []);
  return (
    <div className={styles.container}>
      <IconAnimation icon={ICON_ANIMATION[giftId]} autoplay />
      <div className={styles.title}>{gift.title[languageCode]}</div>
      <Table>
        <TableRow
          label={getFormatText({
            text: TEXTS.giftModalTableLabelFrom[languageCode],
          })}
        >
          <div className={styles.from}>
            <Avatar user={sender} size={20} />
            <ClickableUserName user={sender} />
          </div>
        </TableRow>
        <TableRow
          label={getFormatText({
            text: TEXTS.giftModalTableLabelDate[languageCode],
          })}
        >
          <div>{formatTime(time, languageCode)}</div>
        </TableRow>
        <TableRow
          label={getFormatText({
            text: TEXTS.giftModalTableLabelPrice[languageCode],
          })}
        >
          <div className={styles.price}>
            <IconAsset asset={gift.asset} withColor />
            <div className={styles.amount}>
              {gift.amount} {gift.asset}
            </div>
          </div>
        </TableRow>
        <TableRow
          label={getFormatText({
            text: TEXTS.giftModalTableLabelAvailability[languageCode],
          })}
        >
          <div>
            {getFormatText({
              text: TEXTS.currentOfTotal[languageCode],
              params: {
                current: serialNumberOfGift,
                total: gift.totalNumberOf,
              },
            })}
          </div>
        </TableRow>
      </Table>
    </div>
  );
}
