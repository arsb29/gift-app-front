import { User } from "@/types.ts";

export function formatName(user?: User | null) {
  if (!user) return null;
  if (!(user.firstName || user.lastName) && user.username) return user.username;
  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

export function formatNameShort(user: User) {
  if (!user) return null;
  if (!(user.firstName || user.lastName) && user.username)
    return user.username[0];
  return [user.firstName, user.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join("");
}
