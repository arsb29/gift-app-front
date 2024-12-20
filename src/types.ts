import {
  ACTION_TYPE,
  ACTION_TYPE_ICON,
  CRYPTO_ASSET,
  GIFT_ID,
  LANGUAGE_CODE,
  THEME,
} from "@/constants.ts";
import { ReactNode } from "react";

export type ValuesOf<T> = T[keyof T];

export type GiftId = ValuesOf<typeof GIFT_ID>;
export type CryptoAsset = ValuesOf<typeof CRYPTO_ASSET>;
export type LanguageCode = ValuesOf<typeof LANGUAGE_CODE>;
export type Theme = ValuesOf<typeof THEME>;
export type TitleGiftWithLanguage = Record<LanguageCode, string>;
export type TitleWithLanguage = Record<
  LanguageCode,
  ((params: any) => ReactNode) | string
>;

export type User = {
  _id: string;
  telegramId: string;
  giftsReceived: number;
  isPremium: true;
  firstName: string;
  rank: number;
  lastName: string;
  username: string;
  registerTime: number;
  imageId: string;
};

export type ActionType = ValuesOf<typeof ACTION_TYPE>;
export type ActionTypeIcon = ValuesOf<typeof ACTION_TYPE_ICON>;

export type Action = {
  _id: string;
  gift: Gift;
  sender: User;
  transaction: Transaction;
  receiver?: User;
  time: number;
  type: ActionType;
};

export type Gift = {
  _id: string;
  giftId: GiftId;
  numberOfPurchased: number;
  totalNumberOf: number;
  title: TitleGiftWithLanguage;
  numberOfBooked: number;
  asset: CryptoAsset;
  amount: number;
};

export type Transaction = {
  _id: string;
  gift: string;
  receiver: null;
  sender: string;
  serialNumberOfGift: number;
  status: string;
  invoiceId: number;
  expiresIn: number;
  miniAppPayUrl: string;
};

export type FullTransaction = {
  _id: string;
  gift: Gift;
  receiver: User;
  sender: User;
  serialNumberOfGift: number;
  status: string;
  invoiceId: number;
  expiresIn: number;
  miniAppPayUrl: string;
  updateTime: number;
};

export type NotificationType = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  buttonText: ReactNode;
  onClick: () => void;
  id: number;
};

export type ToggleValue = { title: ReactNode; value: string };
