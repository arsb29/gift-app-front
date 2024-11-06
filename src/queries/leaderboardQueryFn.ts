import { getAuthorizationHeader } from "@/helpers/getAthorizationHeader.ts";

export const leaderboardQueryFn = async ({ pageParam }: any) => {
  const response = await fetch(
    `${import.meta.env.VITE_ENDPOINT}user/leaderboard`,
    {
      method: "POST",
      headers: {
        authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: pageParam, limit: 20 }),
    },
  );
  return await response.json();
};
