import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { User } from "@/types.ts";

export const userIdQueryFn =
  (id: string = "") =>
  async (): Promise<User> => {
    const response = await fetch(`${import.meta.env.VITE_ENDPOINT}user/${id}`, {
      method: "GET",
      headers: {
        authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  };
