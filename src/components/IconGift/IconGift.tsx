import deliciousCake from "@/assets/deliciousCake.png";
import redStar from "@/assets/redStar.png";
import greenStar from "@/assets/greenStar.png";
import blueStar from "@/assets/blueStar.png";
import { GiftId } from "@/types.ts";
import { GIFT_ID } from "@/constants.ts";

type Props = {
  giftId: GiftId;
};

export function IconGift(props: Props) {
  const { giftId } = props;
  let src = null;
  switch (giftId) {
    case GIFT_ID.deliciousCake:
      src = deliciousCake;
      break;
    case GIFT_ID.redStar:
      src = redStar;
      break;
    case GIFT_ID.greenStar:
      src = greenStar;
      break;
    case GIFT_ID.blueStar:
      src = blueStar;
      break;
    default:
      break;
  }
  if (!src) return null;
  return <img src={src} alt={giftId} />;
}
