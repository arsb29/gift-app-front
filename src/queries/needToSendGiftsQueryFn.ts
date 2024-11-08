import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { FullTransaction } from "@/types.ts";

export const checkTransactionQueryFn = async (): Promise<FullTransaction[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_ENDPOINT}transaction/needToSend`,
    {
      method: "GET",
      headers: {
        authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) return Promise.reject();
  return await response.json();
};
