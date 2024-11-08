import { FullTransaction } from "@/types.ts";
import styles from "./GiftPurchased.module.css";
import { ICON_ANIMATION } from "@/constants.ts";
import { IconAnimation } from "@/components/IconAnimation/IconAnimation.tsx";
import { useCallback, useState } from "react";
import { Modal } from "@/components/Modal/Modal.tsx";
import { ModalSendGiftContent } from "@/components/ModalSendGiftContent/ModalSendGiftContent.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";
import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";

type Props = {
  transaction: FullTransaction;
};

export function GiftPurchased(props: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { languageCode } = useLanguageContext();
  const { transaction } = props;
  const { gift, sender, serialNumberOfGift } = transaction;
  const handleClickOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{gift.title[languageCode]}</div>
      <IconAnimation
        size={80}
        autoplay
        icon={ICON_ANIMATION[gift.giftId]}
        keepLastFrame
      />
      <div className={styles.send} onClick={handleClickOpenModal}>
        {getFormatText({ text: TEXTS.giftPurchasedButtonTitle[languageCode] })}
      </div>
      {openModal && (
        <Modal open={openModal} onClose={handleClickCloseModal}>
          <ModalSendGiftContent
            gift={gift}
            sender={sender}
            serialNumberOfGift={serialNumberOfGift}
            time={0}
          />
        </Modal>
      )}
    </div>
  );
}
