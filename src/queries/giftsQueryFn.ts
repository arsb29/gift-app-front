import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";

export const giftsQueryFn = async ({ pageParam }: any) => {
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}gifts`, {
    method: "POST",
    headers: {
      authorization: getAuthorizationHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page: pageParam, limit: 20 }),
  });
  if (!response.ok) return Promise.reject();
  return await response.json();
};
