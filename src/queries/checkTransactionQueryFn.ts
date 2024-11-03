import {getAuthorizationHeader} from "@/helpers/getAthorizationHeader.ts";
import {FullTransaction} from "@/types.ts";

export const checkTransactionQueryFn = (transactionId?: string) => async (): Promise<FullTransaction> => {
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}transaction/check`, {
    method: 'POST',
    headers: {
      'authorization': getAuthorizationHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({transactionId})
  })
  return await response.json();
}
