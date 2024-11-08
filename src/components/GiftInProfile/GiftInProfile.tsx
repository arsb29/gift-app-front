import { FullTransaction } from "@/types.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { Avatar } from "@/components/Avatar/Avatar.tsx";
import styles from "./GiftInProfile.module.css";
import { formatNumber } from "@/helpers/formatNumber.ts";
import { forwardRef, LegacyRef, useCallback, useState } from "react";
import { Modal } from "@/components/Modal/Modal.tsx";
import { ModalGiftContent } from "@/components/ModalGiftContent/ModalGiftContent.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";

type Props = {
  transaction: FullTransaction;
};

export const GiftInProfile = forwardRef(
  (props: Props, ref: LegacyRef<HTMLDivElement>) => {
    const { transaction } = props;
    const { languageCode } = useLanguageContext();
    const { serialNumberOfGift } = transaction;
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleClickOpenModal = useCallback(() => {
      setOpenModal(true);
    }, []);
    const handleClickCloseModal = useCallback(() => {
      setOpenModal(false);
    }, []);
    const { gift, sender } = transaction;
    return (
      <>
        <div
          className={styles.container}
          ref={ref}
          onClick={handleClickOpenModal}
        >
          <div className={styles.info}>
            <Avatar user={sender} size={16} />
            <div className={styles.count}>
              {getFormatText({
                text: TEXTS.currentOfTotal[languageCode],
                params: {
                  current: 1,
                  total: formatNumber(gift.totalNumberOf),
                },
              })}
            </div>
          </div>
          <IconAnimation icon={gift.giftId} size={80} autoplay />
          <div className={styles.title}>{gift.title[languageCode]}</div>
        </div>
        {openModal && (
          <Modal open={openModal} onClose={handleClickCloseModal}>
            <ModalGiftContent
              gift={gift}
              sender={sender}
              serialNumberOfGift={serialNumberOfGift}
              time={transaction.updateTime}
              onClick={handleClickCloseModal}
            />
          </Modal>
        )}
      </>
    );
  },
);

GiftInProfile.displayName = "GiftInProfile";
