import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { User } from "@/types.ts";

export const userReceiveActionsQueryFn =
  (id: string = "") =>
  async ({ pageParam }: any): Promise<User> => {
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT}actions/user/receive`,
      {
        method: "POST",
        headers: {
          authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: id, page: pageParam, limit: 20 }),
      },
    );
    return await response.json();
  };
