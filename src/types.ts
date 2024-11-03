import {CRYPTO_ASSET, GIFT_ID, LANGUAGE} from "@/constants.ts";

export type ValuesOf<T> = T[keyof T];

type GiftId = ValuesOf<typeof GIFT_ID>;
type Language = ValuesOf<typeof LANGUAGE>;
export type CryptoAsset = ValuesOf<typeof CRYPTO_ASSET>;

type TitleWithLanguage = Record<Language, string>

export type Gift = {
  _id: string,
  giftId: GiftId,
  numberOfPurchased: number,
  totalNumberOf: number,
  title: TitleWithLanguage,
  numberOfBooked: number,
  asset: CryptoAsset,
  amount: number
};

export type Transaction = {
  _id: string,
  gift: string,
  receiver: null,
  sender: string,
  serialNumberOfGift: null,
  status: string,
  invoiceId: number,
  expiresIn: number,
  miniAppPayUrl: string
}
