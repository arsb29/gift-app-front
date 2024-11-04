import type { ComponentType, JSX } from 'react';
import { GiftsPage } from '@/pages/GiftsPage/GiftsPage.tsx';
import {GiftPage} from "@/pages/GiftPage/GiftPage.tsx";
import {GiftPurchasedPage} from "@/pages/GiftPurchasedPage/GiftPurchasedPage.tsx";
import {MyGifts} from "@/pages/MyGifts/MyGifts.tsx";
import {Leaderboard} from "@/pages/Leaderboard/Leaderboard.tsx";
import {ProfilePage} from "@/pages/ProfilePage/ProfilePage.tsx";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const ROUTES_PATHS = {
  gifts: '/gifts',
  mygifts: '/mygifts',
  gift: '/gifts/:id',
  giftPaid: '/gifts/paid/:id',
  leaderboard: '/leaderboard',
  profile: '/profile',
} as const;

export const routes: Route[] = [
  { path: ROUTES_PATHS.gifts, Component: GiftsPage },
  { path: ROUTES_PATHS.gift, Component: GiftPage },
  { path: ROUTES_PATHS.giftPaid, Component: GiftPurchasedPage },
  { path: ROUTES_PATHS.mygifts, Component: MyGifts },
  { path: ROUTES_PATHS.leaderboard, Component: Leaderboard },
  { path: ROUTES_PATHS.profile, Component: ProfilePage }
];
