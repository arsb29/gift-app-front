interface Plural {
  (
    count: number,
    singular: string,
    plural1: string,
    plural2?: string,
    forceNumber?: never,
  ): string;
  (
    count: number | string,
    singular: string,
    plural1: string,
    plural2?: string,
    forceNumber?: boolean,
  ): string;
}

/** Получить склонение слова */
export const plural: Plural = (value, singular, plural1, plural2 = plural1) => {
  const count = Number(value);
  const hasFloatingPoint = count % 1 !== 0;
  if (hasFloatingPoint) return plural2;
  const c1 = Math.abs(count % 100);
  if (c1 >= 5 && c1 <= 20) return plural2;
  const c2 = Math.abs(c1 % 10);
  if (c2 === 1) return singular;
  if (c2 >= 2 && c2 <= 4) return plural1;
  return plural2;
};

/** Получить отформатированное число со склоняемым словом */
export const pluralize: Plural = (
  count,
  singular,
  plural1,
  plural2 = plural1,
  forceNumber,
) => {
  return `${count} ${plural(count, singular, plural1, plural2, forceNumber)}`;
};
