import {getAuthorizationHeader} from "@/helpers/getAthorizationHeader.ts";
import {User} from "@/types.ts";

export const userRecentActionsQueryFn = (id: string = '') => async ({pageParam}): Promise<User> => {
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}actions/user`, {
    method: 'POST',
    headers: {
      'authorization': getAuthorizationHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user: id, page: pageParam, limit: 20})
  })
  return await response.json()
}
