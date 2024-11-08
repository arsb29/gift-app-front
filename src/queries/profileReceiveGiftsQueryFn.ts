import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { User } from "@/types.ts";

export const profileReceiveGiftsQueryFn =
  (userId: string = "") =>
  async ({ pageParam }: any): Promise<User> => {
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT}transaction/giftsReceived`,
      {
        method: "POST",
        headers: {
          authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, page: pageParam, limit: 20 }),
      },
    );
    if (!response.ok) return Promise.reject();
    return await response.json();
  };
