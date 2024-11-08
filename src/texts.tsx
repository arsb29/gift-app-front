import { LANGUAGE_CODE } from "@/constants.ts";
import { TitleWithLanguage } from "@/types.ts";
import { plural, pluralize } from "@/helpers/plural.ts";
import { ClickableUserName } from "@/components/ClickableUserName/ClickableUserName.tsx";
import { formatName } from "@/helpers/formatName.ts";

export const TEXTS: Record<string, TitleWithLanguage> = {
  currentOfTotal: {
    [LANGUAGE_CODE.en]: ({ current, total }) => `${current} of ${total}`,
    [LANGUAGE_CODE.ru]: ({ current, total }) => `${current} из ${total}`,
  },
  errorDescription: {
    [LANGUAGE_CODE.en]: "Failed to upload data",
    [LANGUAGE_CODE.ru]: "Не удалось загрузить данные",
  },
  errorTitle: {
    [LANGUAGE_CODE.en]: "Error",
    [LANGUAGE_CODE.ru]: "Ошибка",
  },
  giftModalTableLabelAvailability: {
    [LANGUAGE_CODE.en]: "Availability",
    [LANGUAGE_CODE.ru]: "Номер",
  },
  giftModalTableLabelDate: {
    [LANGUAGE_CODE.en]: "Date",
    [LANGUAGE_CODE.ru]: "Дата",
  },
  giftModalTableLabelFrom: {
    [LANGUAGE_CODE.en]: "From",
    [LANGUAGE_CODE.ru]: "От кого",
  },
  giftModalTableLabelGift: {
    [LANGUAGE_CODE.en]: "Gift",
    [LANGUAGE_CODE.ru]: "Подарок",
  },
  giftModalTableLabelPrice: {
    [LANGUAGE_CODE.en]: "Price",
    [LANGUAGE_CODE.ru]: "Цена",
  },
  giftModalTableSendGiftButtonText: {
    [LANGUAGE_CODE.en]: "Send Gift to Contact",
    [LANGUAGE_CODE.ru]: "Отправь подарок другу",
  },
  giftModalTableTitle: {
    [LANGUAGE_CODE.en]: "Send Gift",
    [LANGUAGE_CODE.ru]: "Отправь подарок",
  },
  giftPageDescription: {
    [LANGUAGE_CODE.en]:
      "Purchase this gift for the opportunity to give it to another user.",
    [LANGUAGE_CODE.ru]:
      "Приобретайте этот подарок ради возможности подарить его другому пользователю.",
  },
  giftPageRecentlyActionTypeBuy: {
    [LANGUAGE_CODE.en]: "Buy gift",
    [LANGUAGE_CODE.ru]: "Покупка подарка",
  },
  giftPageRecentlyActionTypeBuyDescription: {
    [LANGUAGE_CODE.en]: ({ sender }) => (
      <span>
        <ClickableUserName user={sender} /> bought a gift
      </span>
    ),
    [LANGUAGE_CODE.ru]: ({ sender }) => (
      <span>
        <ClickableUserName user={sender} /> купил подарок
      </span>
    ),
  },
  giftPageRecentlyActionTypeSend: {
    [LANGUAGE_CODE.en]: "Send gift",
    [LANGUAGE_CODE.ru]: "Отправка подарка",
  },
  giftPageRecentlyActionTypeSendDescription: {
    [LANGUAGE_CODE.en]: ({ sender, receiver }) => (
      <span>
        <ClickableUserName user={sender} /> sent gift
        {receiver ? (
          <span>
            {" "}
            to <ClickableUserName user={receiver} />
          </span>
        ) : (
          ""
        )}
      </span>
    ),
    [LANGUAGE_CODE.ru]: ({ sender, receiver }) => (
      <span>
        <ClickableUserName user={sender} /> отправил подарок{" "}
        {receiver ? <ClickableUserName user={receiver} /> : ""}
      </span>
    ),
  },
  giftPageRecentlyActions: {
    [LANGUAGE_CODE.en]: "Recently Actions",
    [LANGUAGE_CODE.ru]: "Недавние действия",
  },
  giftPageRecentlyActionsEmptyDescription: {
    [LANGUAGE_CODE.en]: "Give and receive gifts so there's something here.",
    [LANGUAGE_CODE.ru]: "Дарите и получайте подарки, и здесь что-то появится.",
  },
  giftPageRecentlyActionsEmptyTitle: {
    [LANGUAGE_CODE.en]: "History is Empty",
    [LANGUAGE_CODE.ru]: "История пуста",
  },
  giftPageTelegramMainButton: {
    [LANGUAGE_CODE.en]: "Buy a Gift",
    [LANGUAGE_CODE.ru]: "Купить подарок",
  },
  giftPurchasedButtonTitle: {
    [LANGUAGE_CODE.en]: "Send",
    [LANGUAGE_CODE.ru]: "Отправить",
  },
  giftPurchasedPageDescription: {
    [LANGUAGE_CODE.en]: ({ gift, amount, asset }) =>
      `The ${gift} gift was purchased for ${amount} ${asset}.`,
    [LANGUAGE_CODE.ru]: ({ gift, amount, asset }) =>
      `Подарок ${gift} был приобретен за ${amount} ${asset}.`,
  },
  giftPurchasedPageNotificationButtonText: {
    [LANGUAGE_CODE.en]: "Send",
    [LANGUAGE_CODE.ru]: "Отправить",
  },
  giftPurchasedPageNotificationDescription: {
    [LANGUAGE_CODE.en]: "Now send it to your friend.",
    [LANGUAGE_CODE.ru]: "Теперь отправь его своему другу.",
  },
  giftPurchasedPageNotificationTitle: {
    [LANGUAGE_CODE.en]: "You Bought a Gift",
    [LANGUAGE_CODE.ru]: "Вы купили подарок",
  },
  giftPurchasedPageTelegramMainButton: {
    [LANGUAGE_CODE.en]: "Send Gift",
    [LANGUAGE_CODE.ru]: "Отправить подарок",
  },
  giftPurchasedPageTelegramSecondaryButton: {
    [LANGUAGE_CODE.en]: "Open Store",
    [LANGUAGE_CODE.ru]: "Открыть магазин",
  },
  giftPurchasedPageTitle: {
    [LANGUAGE_CODE.en]: "Gift Purchased",
    [LANGUAGE_CODE.ru]: "Подарок приобретен ",
  },
  giftReceivedPageDescription: {
    [LANGUAGE_CODE.en]: ({ giftTitle }) =>
      `You have received the gift ${giftTitle}.`,
    [LANGUAGE_CODE.ru]: ({ giftTitle }) => `Вы получили подарок ${giftTitle}.`,
  },
  giftReceivedPageNotificationButtonText: {
    [LANGUAGE_CODE.en]: "View",
    [LANGUAGE_CODE.ru]: "Посмотреть",
  },
  giftReceivedPageNotificationDescription: {
    [LANGUAGE_CODE.en]: ({ giftTitle, sender }) =>
      `${giftTitle} from ${formatName(sender)}`,
    [LANGUAGE_CODE.ru]: ({ giftTitle, sender }) =>
      `${giftTitle} от ${formatName(sender)}`,
  },
  giftReceivedPageNotificationTitle: {
    [LANGUAGE_CODE.en]: "Gift Received",
    [LANGUAGE_CODE.ru]: "Получен подарок",
  },
  giftReceivedPageTelegramMainButton: {
    [LANGUAGE_CODE.en]: "Open Profile",
    [LANGUAGE_CODE.ru]: "Открыть профиль",
  },
  giftReceivedPageTitle: {
    [LANGUAGE_CODE.en]: "Gift Received",
    [LANGUAGE_CODE.ru]: "Получен подарок",
  },
  giftStoreSoldOut: {
    [LANGUAGE_CODE.en]: "Sold Out",
    [LANGUAGE_CODE.ru]: "Распродан",
  },
  giftsPageHeaderDescription: {
    [LANGUAGE_CODE.en]:
      "Send gifts to users that can be stored in their app profile.",
    [LANGUAGE_CODE.ru]:
      "Отправляйте пользователям подарки, которые можно сохранить в их профиле приложения.",
  },
  giftsPageHeaderTitle: {
    [LANGUAGE_CODE.en]: "Send Gifts in Telegram",
    [LANGUAGE_CODE.ru]: "Отправляйте подарки в Telegram",
  },
  leaderboardIdEmptyGiftsDescriptions: {
    [LANGUAGE_CODE.en]: "The user has no gifts",
    [LANGUAGE_CODE.ru]: "У пользователя нет подарков.",
  },
  leaderboardPageLeaderboardItemGiftsCount: {
    [LANGUAGE_CODE.en]: ({ count }) => `${count} gifts`,
    [LANGUAGE_CODE.ru]: ({ count }) =>
      pluralize(count, "подарок", "подарка", "подарков"),
  },
  leaderboardPageSearchPlaceholder: {
    [LANGUAGE_CODE.en]: "Search",
    [LANGUAGE_CODE.ru]: "Поиск",
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
  menuStore: {
    [LANGUAGE_CODE.en]: "Store",
    [LANGUAGE_CODE.ru]: "Магазин",
  },
  myGiftsEmptyListButtonText: {
    [LANGUAGE_CODE.en]: "Open Store",
    [LANGUAGE_CODE.ru]: "Открыть магазин",
  },
  myGiftsEmptyListDescription: {
    [LANGUAGE_CODE.en]: "You don't have any gifts yet.",
    [LANGUAGE_CODE.ru]: "У тебя пока нет никаких подарков.",
  },
  profileEmptyGiftsButtonText: {
    [LANGUAGE_CODE.en]: "Open Store",
    [LANGUAGE_CODE.ru]: "Открыть магазин",
  },
  profileEmptyGiftsDescriptions: {
    [LANGUAGE_CODE.en]: "You can buy a gift to receive a gift in return.",
    [LANGUAGE_CODE.ru]: "Вы можете купить подарок, чтобы получить его взамен.",
  },
  profileGiftsReceived: {
    [LANGUAGE_CODE.en]: ({ count }) => `${count} gifts received`,
    [LANGUAGE_CODE.ru]: ({ count }) =>
      `${pluralize(count, "подарок", "подарка", "подарков")} ${plural(count, "получен", "получено")}`,
  },
  profileRecentActionBuyDescription: {
    [LANGUAGE_CODE.en]: ({ amount, asset }) => `-${amount} ${asset}`,
    [LANGUAGE_CODE.ru]: ({ amount, asset }) => `-${amount} ${asset}`,
  },
  profileRecentActionReceiveDescription: {
    [LANGUAGE_CODE.en]: ({ sender }) => (
      <span>
        from <ClickableUserName user={sender} />
      </span>
    ),
    [LANGUAGE_CODE.ru]: ({ sender }) => (
      <span>
        от <ClickableUserName user={sender} />
      </span>
    ),
  },
  profileRecentActionSendDescription: {
    [LANGUAGE_CODE.en]: ({ receiver }) => (
      <span>
        to <ClickableUserName user={receiver} />
      </span>
    ),
    [LANGUAGE_CODE.ru]: ({ receiver }) => (
      <span>
        <ClickableUserName user={receiver} />
      </span>
    ),
  },
  profileRecentActions: {
    [LANGUAGE_CODE.en]: "Recent Actions ›",
    [LANGUAGE_CODE.ru]: "Недавние действия ›",
  },
  profileRecentActionsDescription: {
    [LANGUAGE_CODE.en]: "Give and receive gifts so there's something here.",
    [LANGUAGE_CODE.ru]: "Дарите и получайте подарки, и здесь что-то появится.",
  },
  profileRecentActionsHeader: {
    [LANGUAGE_CODE.en]: "History is Empty",
    [LANGUAGE_CODE.ru]: "История пуста",
  },
  profileRecentActionsPageDescription: {
    [LANGUAGE_CODE.en]: "Here is your action history.",
    [LANGUAGE_CODE.ru]: "Здесь история ваших действий.",
  },
  profileRecentActionsPageTitle: {
    [LANGUAGE_CODE.en]: "Recent Actions",
    [LANGUAGE_CODE.ru]: "Недавние действия",
  },
  profileRecentActionsPageTypeBuy: {
    [LANGUAGE_CODE.en]: "Buy",
    [LANGUAGE_CODE.ru]: "Купил",
  },
  profileRecentActionsPageTypeReceive: {
    [LANGUAGE_CODE.en]: "Receive",
    [LANGUAGE_CODE.ru]: "Получил",
  },
  profileRecentActionsPageTypeSend: {
    [LANGUAGE_CODE.en]: "Sent",
    [LANGUAGE_CODE.ru]: "Отправил",
  },
  storeHeaderDescription: {
    [LANGUAGE_CODE.en]: "Unique gifts for everyone by Crypto Pay.",
    [LANGUAGE_CODE.ru]: "Уникальные подарки для всех от Crypto Pay.",
  },
  storeHeaderTitle: {
    [LANGUAGE_CODE.en]: "Buy and Send Gifts",
    [LANGUAGE_CODE.ru]: "Покупайте и отправляйте подарки",
  },
};
