import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";

export const giftActionsQueryFn =
  (id: string) =>
  async ({ pageParam }: any) => {
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT}actions/gift`,
      {
        method: "POST",
        headers: {
          authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: pageParam, limit: 20, gift: id }),
      },
    );
    if (!response.ok) return Promise.reject();
    return await response.json();
  };
