import {getAuthorizationHeader} from "@/helpers/getAthorizationHeader.ts";

export const giftsQueryFn = async () => {
  const response = await fetch(`${import.meta.env.VITE_ENDPOINT}gifts`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationHeader(),
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
