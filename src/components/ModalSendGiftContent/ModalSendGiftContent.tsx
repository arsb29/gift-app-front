import styles from "./ModalSendGiftContent.module.css";
import { Gift, User } from "@/types.ts";
import { Table } from "@/components/Table/Table.tsx";
import { TableRow } from "@/components/Table/TableRow.tsx";
import { IconAsset } from "@/components/IconAsset/IconAsset.tsx";
import { formatTime } from "@/helpers/formatTime.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { ICON_ANIMATION } from "@/constants.ts";
import { useCallback, useEffect } from "react";
import {
  mountMainButton,
  setMainButtonParams,
  unmountMainButton,
  onMainButtonClick,
  switchInlineQuery,
  offMainButtonClick,
  hapticFeedback,
} from "@telegram-apps/sdk-react";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { Stars } from "@/components/Stars/Stars.tsx";

type Props = {
  sender: User;
  gift: Gift;
  time: number;
  serialNumberOfGift: number;
};

export function ModalSendGiftContent(props: Props) {
  const { gift, time, serialNumberOfGift } = props;
  const { giftId } = gift;
  const { languageCode } = useLanguageContext();
  const handleSendGift = useCallback(() => {
    hapticFeedback.impactOccurred("soft");
    if (switchInlineQuery.isSupported() && giftId)
      switchInlineQuery(giftId, ["users"]);
  }, [giftId]);
  useEffect(() => {
    mountMainButton();
    setMainButtonParams({
      text: getFormatText({
        text: TEXTS.giftModalTableSendGiftButtonText[languageCode],
      }) as string,
      isVisible: true,
    });
    onMainButtonClick(handleSendGift);
    return () => {
      offMainButtonClick(handleSendGift);
      setMainButtonParams({
        isVisible: false,
      });
      unmountMainButton();
    };
  }, [handleSendGift, languageCode]);
  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <Stars />
        <IconAnimation icon={ICON_ANIMATION[gift.giftId]} autoplay />
      </div>
      <div className={styles.title}>
        {getFormatText({ text: TEXTS.giftModalTableTitle[languageCode] })}
      </div>
      <Table>
        <TableRow
          label={getFormatText({
            text: TEXTS.giftModalTableLabelGift[languageCode],
          })}
        >
          <div>{gift.title[languageCode]}</div>
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
