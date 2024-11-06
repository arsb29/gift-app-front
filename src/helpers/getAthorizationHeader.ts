import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export function getAuthorizationHeader() {
  const { initDataRaw } = retrieveLaunchParams();
  return `tma ${initDataRaw}`;
}
