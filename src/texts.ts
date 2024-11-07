import { LANGUAGE_CODE } from "@/constants.ts";
import { TitleWithLanguage } from "@/types.ts";
import { plural, pluralize } from "@/helpers/plural.ts";

export const TEXTS: Record<string, TitleWithLanguage> = {
  leaderboardIdEmptyGiftsDescriptions: {
    [LANGUAGE_CODE.en]: "The user has no gifts",
    [LANGUAGE_CODE.ru]: "У пользователя нет подарков.",
  },
  profileGiftsReceived: {
    [LANGUAGE_CODE.en]: ({ count }) => `${count} gifts received`,
    [LANGUAGE_CODE.ru]: ({ count }) =>
      `${pluralize(count, "подарок", "подарка", "подарков")} ${plural(count, "получен", "получено")}`,
  },
  profileEmptyGiftsDescriptions: {
    [LANGUAGE_CODE.en]: "You can buy a gift to receive a gift in return.",
    [LANGUAGE_CODE.ru]: "Вы можете купить подарок, чтобы получить его взамен.",
  },
  profileRecentActions: {
    [LANGUAGE_CODE.en]: "Recent Actions ›",
    [LANGUAGE_CODE.ru]: "Недавние действия ›",
  },
  menuStore: {
    [LANGUAGE_CODE.en]: "Store",
    [LANGUAGE_CODE.ru]: "Магазин",
  },
  menuGifts: {
    [LANGUAGE_CODE.en]: "Gifts",
    [LANGUAGE_CODE.ru]: "Подарки",
  },
  menuLeaderboard: {
    [LANGUAGE_CODE.en]: "Leaderboard",
    [LANGUAGE_CODE.ru]: "Лидеры",
  },
  menuProfile: {
    [LANGUAGE_CODE.en]: "Profile",
    [LANGUAGE_CODE.ru]: "Профиль",
  },
  storeHeaderTitle: {
    [LANGUAGE_CODE.en]: "Buy and Send Gifts",
    [LANGUAGE_CODE.ru]: "Покупайте и отправляйте подарки",
  },
  storeHeaderDescription: {
    [LANGUAGE_CODE.en]: "Unique gifts for everyone by Crypto Pay.",
    [LANGUAGE_CODE.ru]: "Уникальные подарки для всех от Crypto Pay.",
  },
};
