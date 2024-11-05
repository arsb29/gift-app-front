import {LanguageCode} from "@/types.ts";

type Options = {
  date: string;
  language?: LanguageCode;
}

const MONTH_NAME = {
  en: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  } as Record<number, string>,
  ru: {
    1: 'Января',
    2: 'Февраля',
    3: 'Марта',
    4: 'Апреля',
    5: 'Мая',
    6: 'Июня',
    7: 'Июля',
    8: 'Августа',
    9: 'Сентября',
    10: 'Октября',
    11: 'Ноября',
    12: 'Декабря'
  } as Record<number, string>
} as const;

export function formatDate(options: Options) {
  const {date, language = 'en'} = options;
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return [day.toString().padStart(2, '0'), MONTH_NAME[language][month]].filter(Boolean).join(' ')
}