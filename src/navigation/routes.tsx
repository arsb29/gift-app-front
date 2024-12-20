import type { ComponentType, JSX } from "react";
import { StorePage } from "@/pages/StorePage/StorePage.tsx";
import { GiftPage } from "@/pages/GiftPage/GiftPage.tsx";
import { GiftPurchasedPage } from "@/pages/GiftPurchasedPage/GiftPurchasedPage.tsx";
import { GiftsPurchasedPage } from "@/pages/GiftsPurchasedPage/GiftsPurchasedPage.tsx";
import { Leaderboard } from "@/pages/Leaderboard/Leaderboard.tsx";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage.tsx";
import { ProfileRecentActions } from "@/pages/ProfileRecentActions/ProfileRecentActions.tsx";
import { GiftReceivePage } from "@/pages/GiftReceivePage/GiftReceivePage.tsx";
import { LeaderboardIdPage } from "@/pages/LeaderboardIdPage/LeaderboardIdPage.tsx";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const ROUTES_PATHS = {
  store: "/store",
  giftsPurchased: "/giftsPurchased",
  gift: "/gifts/:giftId",
  giftPaid: "/gifts/paid/:id",
  giftReceive: "/gifts/receive/:transactionId",
  leaderboard: "/leaderboard",
  leaderboardId: "/leaderboard/:id",
  profile: "/profile",
  profileRecentActions: "/profile/:id/recentActions",
} as const;

export const routes: Route[] = [
  { path: ROUTES_PATHS.store, Component: StorePage },
  { path: ROUTES_PATHS.gift, Component: GiftPage },
  { path: ROUTES_PATHS.giftPaid, Component: GiftPurchasedPage },
  { path: ROUTES_PATHS.giftsPurchased, Component: GiftsPurchasedPage },
  { path: ROUTES_PATHS.leaderboard, Component: Leaderboard },
  { path: ROUTES_PATHS.profile, Component: ProfilePage },
  { path: ROUTES_PATHS.profileRecentActions, Component: ProfileRecentActions },
  { path: ROUTES_PATHS.giftReceive, Component: GiftReceivePage },
  { path: ROUTES_PATHS.leaderboardId, Component: LeaderboardIdPage },
];
