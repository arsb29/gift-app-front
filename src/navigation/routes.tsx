import type { ComponentType, JSX } from 'react';
import { GiftsPage } from '@/pages/GiftsPage.tsx';
import {GiftPage} from "@/pages/GiftPage.tsx";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const ROUTES_PATHS = {
  gifts: '/gifts',
  gift: '/gifts/:id',
} as const;

export const routes: Route[] = [
  { path: ROUTES_PATHS.gifts, Component: GiftsPage },
  { path: ROUTES_PATHS.gift, Component: GiftPage }
];
