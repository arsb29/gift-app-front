import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { FullTransaction } from "@/types.ts";

export const receiveGiftTransactionQueryFn =
  (transactionId?: string) => async (): Promise<FullTransaction> => {
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT}/transaction/receive`,
      {
        method: "POST",
        headers: {
          authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      },
    );
    if (!response.ok) return Promise.reject();
    return await response.json();
  };
