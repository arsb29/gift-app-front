export function formatNumber(num: number) {
  return num >= 1000 ? (num / 1000).toFixed(0) + 'K' : num;
}
