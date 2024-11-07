import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { openTelegramLink } from "@telegram-apps/sdk-react";

export const createTransactionQueryFn = (_id?: string) => async () => {
  if (!_id) return null;
  const response = await fetch(
    `${import.meta.env.VITE_ENDPOINT}transaction/createInvoice`,
    {
      method: "POST",
      headers: {
        authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    },
  );
  const transaction = await response.json();
  openTelegramLink(transaction.miniAppPayUrl);
};
