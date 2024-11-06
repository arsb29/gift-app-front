import { User } from "@/types.ts";

export function formatName(user?: User | null) {
  if (!user) return null;
  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

export function formatNameShort(user: User) {
  if (!user) return null;
  return [user.firstName, user.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join("");
}
