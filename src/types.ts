import {ACTION_TYPE, ACTION_TYPE_ICON, CRYPTO_ASSET, GIFT_ID, LANGUAGE, LANGUAGE_CODE} from "@/constants.ts";

export type ValuesOf<T> = T[keyof T];

export type GiftId = ValuesOf<typeof GIFT_ID>;
type Language = ValuesOf<typeof LANGUAGE>;
export type CryptoAsset = ValuesOf<typeof CRYPTO_ASSET>;
export type LanguageCode = ValuesOf<typeof LANGUAGE_CODE>;

type TitleWithLanguage = Record<Language, string>

export type User = {
  _id: string,
  telegramId: string,
  giftsReceived: number,
  isPremium: true,
  firstName: string,
  rank: number,
  lastName: string,
  username: string,
  registerTime: number,
  imageId: string
};

export type LeaderboardResponse = {
  users: User[],
  currentPage: number,
  hasMore: boolean,
}

export type ActionType = ValuesOf<typeof ACTION_TYPE>;
export type ActionTypeIcon = ValuesOf<typeof ACTION_TYPE_ICON>;

export type Action = {
  _id: string,
  gift: Gift,
  sender: User,
  transaction: Transaction,
  receiver?: User,
  time: number,
  type: ActionType
}

export type ActionsResponse = {
  actions: Action[],
  currentPage: number,
  hasMore: boolean,
}

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

export type FullTransaction = {
  _id: string,
  gift: Gift,
  receiver: User,
  sender: User,
  serialNumberOfGift: null,
  status: string,
  invoiceId: number,
  expiresIn: number,
  miniAppPayUrl: string
}
