import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";
import { User } from "@/types.ts";

export const userQueryFn = async (): Promise<User> => {
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/user`, {
    method: "GET",
    headers: {
      authorization: getAuthorizationHeader(),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) return Promise.reject();
  return await response.json();
};
