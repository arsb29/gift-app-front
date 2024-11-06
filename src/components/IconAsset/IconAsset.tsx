import Ton from "@/assets/ton.svg?react";
import Eth from "@/assets/eth.svg?react";
import Usdt from "@/assets/usdt.svg?react";
import { CRYPTO_ASSET } from "@/constants.ts";
import styles from "./IconAsset.module.css";
import { cc } from "@/helpers/classConcat.ts";

type Props = {
  asset: string;
  withColor?: boolean;
  size?: 20 | 24;
};

export function IconAsset(props: Props) {
  const { asset, withColor = false, size = 20 } = props;
  let IconComponent = null;
  switch (asset) {
    case CRYPTO_ASSET.TON:
      IconComponent = Ton;
      break;
    case CRYPTO_ASSET.ETH:
      IconComponent = Eth;
      break;
    case CRYPTO_ASSET.USDT:
    default:
      IconComponent = Usdt;
      break;
  }
  return (
    <IconComponent
      className={cc(
        styles.icon,
        withColor && styles[`color-${asset}`],
        styles[`size-${size}`],
      )}
    />
  );
}
