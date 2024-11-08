import { LanguageCode } from "@/types.ts";
import { LANGUAGE_CODE } from "@/constants.ts";

export function formatTime(
  time: number,
  languageCode: LanguageCode = LANGUAGE_CODE.en,
) {
  if (!time) return;
  const date = new Date(time);
  const year = date.getFullYear().toString().substr(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const atText = languageCode === LANGUAGE_CODE.en ? " at " : " в ";
  return day + "." + month + "." + year + atText + hours + ":" + minutes;
}
