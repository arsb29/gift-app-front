export function cc(...classes: Array<string | undefined | boolean>) {
  return classes.filter(Boolean).join(' ');
}