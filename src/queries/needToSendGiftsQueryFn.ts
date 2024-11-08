import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { FullTransaction } from "@/types.ts";

export const checkTransactionQueryFn = async ({
  pageParam,
}: any): Promise<FullTransaction[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_ENDPOINT}/transaction/needToSend`,
    {
      method: "POST",
      headers: {
        authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: pageParam, limit: 20 }),
    },
  );
  if (!response.ok) return Promise.reject();
  return await response.json();
};
