export const ACTION_TYPE_ICON = {
  paperPlane: "paperPlane",
  market: "market",
  boxArchive: "boxArchive",
} as const;

export const CRYPTO_ASSET = {
  USDT: "USDT",
  TON: "TON",
  BTC: "BTC",
  ETH: "ETH",
  LTC: "LTC",
  BNB: "BNB",
  TRX: "TRX",
  USDC: "USDC",
  JET: "JET",
} as const;

export const QUERY_KEYS = {
  store: "store",
  giftsPurchasedPage: "giftsPurchasedPage",
  leaderboard: "leaderboard",
  createTransactionQueryFn: "createTransactionQueryFn",
  giftPurchasedPage: "giftPurchasedPage",
  profile: "profile",
} as const;

export const GIFT_ID = {
  deliciousCake: "deliciousCake",
  blueStar: "blueStar",
  redStar: "redStar",
  greenStar: "greenStar",
} as const;

export const ICON_ANIMATION = {
  giftPurchased: "giftPurchased",
  balloons: "balloons",
  tabGifts: "tabGifts",
  tabStore: "tabStore",
  tabLeaderboard: "tabLeaderboard",
  tabProfile: "tabProfile",
  ...GIFT_ID,
} as const;

export const ACTION_TYPE = {
  buy: "buy",
  send: "send",
  receive: "receive",
} as const;

export const LANGUAGE_CODE = {
  en: "en",
  ru: "ru",
} as const;

export const THEME = {
  light: "light",
  dark: "dark",
} as const;

export const LOCAL_STORAGE_LANGUAGE_KEY = "telegram_gift_app_language_code";
export const LOCAL_STORAGE_THEME_KEY = "telegram_gift_app_theme_code";

export const CRYPTO_PAY_INVOICE_STATUS = {
  paid: "paid",
} as const;

export const TELEGRAM_UI_ELEMENT_BACKGROUND_COLOR = {
  header: {
    [THEME.dark]: "#1C1C1E",
    [THEME.light]: "#FFFFFF",
  },
  bottom: {
    [THEME.dark]: "#1E1E1E",
    [THEME.light]: "#F1F1F2",
  },
} as const;
