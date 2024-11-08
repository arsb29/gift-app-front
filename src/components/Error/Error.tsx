import { getFormatText } from "@/helpers/getFormatText.ts";
import { TEXTS } from "@/texts.tsx";
import { Empty } from "@/components/Empty/Empty.tsx";
import { useLanguageContext } from "@/contexts/language/LanguageContext.tsx";

export function Error() {
  const { languageCode } = useLanguageContext();
  return (
    <Empty
      title={getFormatText({ text: TEXTS.errorTitle[languageCode] })}
      description={getFormatText({
        text: TEXTS.errorDescription[languageCode],
      })}
      withBackground
      withMargin
    />
  );
}
