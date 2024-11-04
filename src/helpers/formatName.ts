import {User} from "@/types.ts";

export function formatName(user: User) {
  if (!user) return null;
  return [user.firstName, user.lastName].filter(Boolean).join(' ');
}