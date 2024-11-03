import type { ComponentType, JSX } from 'react';
import { GiftsPage } from '@/pages/GiftsPage/GiftsPage.tsx';
import {GiftPage} from "@/pages/GiftPage.tsx";

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
  leaderboard: '/leaderboard',
  profile: '/profile',
} as const;

export const routes: Route[] = [
  { path: ROUTES_PATHS.gifts, Component: GiftsPage },
  { path: ROUTES_PATHS.gift, Component: GiftPage }
];
