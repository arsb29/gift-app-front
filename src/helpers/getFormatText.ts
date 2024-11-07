type Options = {
  text: ((params: any) => string) | string;
  params?: Record<string, any>;
};

export function getFormatText(options: Options) {
  const { text, params } = options;
  if (typeof text === "string") return text;
  return text(params);
}
