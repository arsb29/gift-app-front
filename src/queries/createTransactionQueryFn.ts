import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { Transaction } from "@/types.ts";

export const createTransactionQueryFn = async (
  _id: string,
): Promise<Transaction> => {
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
  return await response.json();
};
