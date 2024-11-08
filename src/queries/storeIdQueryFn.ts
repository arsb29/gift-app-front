import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";

export const storeIdQueryFn = (id?: string) => async () => {
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}store/${id}`, {
    method: "GET",
    headers: {
      authorization: getAuthorizationHeader(),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) return Promise.reject();
  return await response.json();
};
