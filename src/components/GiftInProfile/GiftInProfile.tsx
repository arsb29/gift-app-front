import {Action} from "@/types.ts";
import {IconAnimation} from "@/components/IconAnimation/IconAnimation.tsx";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import styles from "./GiftInProfile.module.css";
import {formatNumber} from "@/helpers/formatNumber.ts";
import {forwardRef, LegacyRef, useCallback, useState} from "react";
import {Modal} from "@/components/Modal/Modal.tsx";
import {ModalGiftContent} from "@/components/ModalGiftContent/ModalGiftContent.tsx";

type Props = {
  action: Action
}

export const GiftInProfile = forwardRef((props: Props, ref: LegacyRef<HTMLDivElement>) => {
  const {action} = props;
  const {transaction} = action;
  const {serialNumberOfGift} = transaction;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleClickOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  const {gift, sender} = action;
  return (
    <>
      <div className={styles.container} ref={ref} onClick={handleClickOpenModal}>
        <div className={styles.info}>
          <Avatar user={sender} size={16} />
          <div className={styles.count}>1 of {formatNumber(gift.totalNumberOf)}</div>
        </div>
        <IconAnimation icon={gift.giftId} size={80} autoplay />
        <div className={styles.title}>{gift.title.en}</div>
      </div>
      {openModal && (
        <Modal open={openModal} onClose={handleClickCloseModal}>
          <ModalGiftContent
            gift={gift}
            sender={sender}
            serialNumberOfGift={serialNumberOfGift}
            time={0}
            onClick={handleClickCloseModal}
          />
        </Modal>
      )}
    </>
  );
});

GiftInProfile.displayName = 'GiftInProfile';
