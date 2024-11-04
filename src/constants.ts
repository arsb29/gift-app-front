



export const LANGUAGE = {
  en: 'en',
  ru: 'ru',
};

export const CRYPTO_ASSET = {
  USDT: 'USDT',
  TON: 'TON',
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  BNB: 'BNB',
  TRX: 'TRX',
  USDC: 'USDC',
  JET: 'JET'
} as const;

export const QUERY_KEYS = {
  gifts: 'gifts',
  myGifts: 'myGifts',
  leaderboard: 'leaderboard'
} as const;

export const GIFT_ID = {
  deliciousCake: 'deliciousCake',
  blueStar: 'blueStar',
  redStar: 'redStar',
  greenStar: 'greenStar',
} as const;

export const ICON_ANIMATION = {
  giftPurchased: 'giftPurchased',
  balloons: 'balloons',
  tabGifts: 'tabGifts',
  tabStore: 'tabStore',
  tabLeaderboard: 'tabLeaderboard',
  tabProfile: 'tabProfile',
  ...GIFT_ID
} as const;

export const ACTION_TYPE = {
  buy: 'buy',
  send: 'send',
  receive: 'receive'
} as const;


